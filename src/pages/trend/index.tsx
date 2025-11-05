import Layout from "@/src/components/common/Layout";
import { Box, ButtonBase, CircularProgress, Drawer, Typography } from "@mui/material";
import { amber, blueGrey, grey } from "@mui/material/colors";
import { TREND_CATEGORIES } from "@/src/constants/categories";
import { useEffect, useRef, useState } from "react";
import { fetcher, PAGE_SIZE } from "@/src/lib/fetcher";
import useSWRInfinite from "swr/infinite";
import { TrendCategoryItem } from "@/src/components/trend/TrendCategoryItem";
import TrendListItem from "@/src/components/trend/TrendListItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import TrendSortButton from "@/src/components/trend/TrendSortButton";
import TrendFilterSection from "@/src/components/trend/TrendFilterSection";
import User from "@/src/components/common/User";

export default function TrendPage() {
    const [q, setQ] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [supply, setSupply] = useState<string[]>([]);
    const [demand, setDemand] = useState<string[]>([]);
    const [isAll, setIsAll] = useState(true);
    const [sort, setSort] = useState("latest");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [tempSupply, setTempSupply] = useState<string[]>([]);
    const [tempDemand, setTempDemand] = useState<string[]>([]);

    // 🔹 Drawer 열릴 때 임시 복사
    useEffect(() => {
        if (drawerOpen) {
            setTempSupply([...supply]);
            setTempDemand([...demand]);
        }
    }, [drawerOpen]);

    // 🔹 "확인" 클릭 시 → 실제 반영
    const handleConfirm = () => {
        setSupply(tempSupply);
        setDemand(tempDemand);
        setDrawerOpen(false);
    };

    // 🔹 "닫기" 시 → 되돌리기
    const handleCancel = () => {
        setTempSupply([...supply]);
        setTempDemand([...demand]);
        setDrawerOpen(false);
    };

    // ✅ getKey: sort를 포함해야 정렬 변경 시 SWR이 새로운 키로 인식함
    const getKey = (pageIndex: number, prev: any) => {
        if (prev && !prev.hasMore) return null;

        const params = new URLSearchParams({
            page: String(pageIndex + 1),
            pageSize: String(PAGE_SIZE),
            ...(q ? { q } : {}),
            ...(isAll ? {} : { category: categories.join(",") }),
            ...(supply.length ? { supply: supply.join(",") } : {}),
            ...(demand.length ? { demand: demand.join(",") } : {}),
            ...(sort ? { sort } : {}),
        });

        return `/api/trend?${params.toString()}`;
    };

    const { data, setSize, isValidating, mutate } = useSWRInfinite(getKey, fetcher, {
        onSuccess: (data) => {
            console.log("✅ SWR fetched:", data?.[0]?.results?.length, "items");
        },
        onError: (err) => {
            console.error("❌ SWR error:", err);
        },
    });

    const trendList = data ? data.flatMap((page: any) => page.results) : [];
    const total = data?.[0]?.total || 0;
    const hasMore = data?.[data.length - 1]?.hasMore;

    // ✅ 정렬 변경 시 첫 페이지부터 다시 로드 (핵심)
    useEffect(() => {
        console.log("🔄 필터/정렬 변경 감지 → SWR 초기화");
        setSize(1);     // 페이지를 첫 페이지로 리셋
        mutate(undefined, { revalidate: true }); // 캐시 초기화 및 새로고침
        window.scrollTo({ top: 0 }); // 스크롤 맨 위로
    }, [sort, q, categories, supply, demand]);

    // 무한스크롤
    const handleScroll = () => {
        if (!hasMore || isValidating) return;
        const scrollY = window.scrollY + window.innerHeight;
        const threshold = document.body.offsetHeight - 200;
        if (scrollY > threshold) setSize((s: any) => s + 1);
    };

    // 무한스크롤 → Intersection Observer 기반으로 변경
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!loaderRef.current || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isValidating) {
                    console.log("👀 관찰영역 진입 → 다음 페이지 로드");
                    setSize((s: any) => s + 1);
                }
            },
            { rootMargin: "200px" } // 미리 200px 전에 로드
        );

        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [hasMore, isValidating, setSize]);


    // 카테고리 전체 클릭
    const handleClickCategoryAll = () => {
        setIsAll(true);
        setCategories([]);
    };

    return (
        <>
            <Layout>
                {/* 페이지 헤더 시작 */}
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        py: 5,
                        px: 10,
                        "@media (max-width: 768px)": {
                            flexDirection: "column",
                            pt: 0,
                            pb: 0,
                            px: 0,
                            position: "sticky",
                            top: 80,
                            bgcolor: "#ffffff",
                            zIndex: 9999
                        },
                    }}
                >
                    {/* 웹 제목 시작 */}
                    <Typography
                        sx={{
                            fontSize: 24,
                            lineHeight: "32px",
                            fontWeight: 700,
                            width: 192,
                            "@media (max-width: 768px)": {
                                display: 'none'
                            },
                        }}
                    >
                        트렌드
                    </Typography>
                    {/* 웹 제목 끝 */}
                    {/* 카테고리 시작 */}
                    <Box
                        sx={{
                            position: "relative",
                        }}
                    >
                        <Box sx={{ overflowX: "scroll" }}>
                            <Box
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 1,
                                    px: 5,
                                    flexWrap: "nowrap",
                                    "& > *": { flex: "0 0 auto" },
                                    "@media (max-width: 768px)": { px: 3 },
                                }}
                            >
                                <ButtonBase
                                    onClick={handleClickCategoryAll}
                                    sx={{
                                        px: 1.5,
                                        borderRadius: 20,
                                        bgcolor: grey[900],
                                        color: "#ffffff",
                                        opacity: isAll ? 1 : 0.3,
                                        alignItems: 'center',
                                        height: '32px',
                                    }}
                                >
                                    <Typography sx={{
                                        fontSize: 14,
                                        lineHeight: '20px',
                                        fontWeight: 700, color: "#ffffff"
                                    }}>
                                        전체
                                    </Typography>
                                </ButtonBase>
                                {TREND_CATEGORIES.map((item, index) => {
                                    const focused = categories.includes(item.key);
                                    const handleCategoryClick = (key: string) => {
                                        if (key === "all") {
                                            setIsAll(true);
                                            setCategories([]);
                                            return;
                                        }
                                        setCategories((prev) => {
                                            if (prev.includes(key)) {
                                                const next = prev.filter((c) => c !== key);
                                                if (next.length === 0) {
                                                    setIsAll(true);
                                                    return [];
                                                }
                                                return next;
                                            }
                                            setIsAll(false);
                                            return [...prev, key];
                                        });
                                    };
                                    return (
                                        <TrendCategoryItem
                                            onClick={() => handleCategoryClick(item.key)}
                                            focused={focused}
                                            key={index}
                                            item={item}
                                        />
                                    );
                                })}
                                <Box sx={{ width: 16 }} />
                            </Box>
                        </Box>
                    </Box>
                    {/* 카테고리 끝 */}
                </Box>

                {/* 메인 */}
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        px: 10,
                        gap: 5,
                        "@media (max-width: 768px)": {
                            px: 0,
                            flexDirection: "column",
                        },
                    }}
                >
                    {/* 웹 필터 */}
                    <Box sx={{ "@media (max-width: 768px)": { display: "none" } }}>
                        <TrendFilterSection
                            supply={supply}
                            demand={demand}
                            onChangeSupply={setSupply}
                            onChangeDemand={setDemand}
                        />
                    </Box>

                    {/* 카드 영역 */}
                    <Box sx={{ flex: 1, "@media (max-width: 768px)": { width: "100%" } }}>
                        {/* 리스트 헤더 영역 시작 */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                pb: 3,
                                gap: 1,
                                "@media (max-width: 768px)": {
                                    position: "sticky",
                                    top: 80 + 32,
                                    zIndex: 999,
                                    bgcolor: "#ffffff",
                                    px: 3,
                                    pt: 2,
                                    pb: 2,
                                    borderBottom: `1px solid ${grey[300]}`,
                                },
                            }}
                        >
                            <Typography sx={{ flex: 1, fontSize: 14, "& span": { fontWeight: 700 } }}>
                                총 <span>{total}</span>개의 트렌드
                            </Typography>
                            {/* 모바일 필터 버튼 시작 */}
                            <Box
                                sx={{
                                    display: "none",
                                    "@media (max-width: 768px)": { display: "flex" },
                                }}
                            >
                                <ButtonBase
                                    onClick={() => setDrawerOpen(true)}
                                    sx={{
                                        position: 'relative',
                                        border: `1px solid ${grey[400]}`,
                                        px: 1.5,
                                        py: 1,
                                        borderRadius: 0.5,
                                        "@media (max-width: 768px)": {
                                            px: 1,
                                        },
                                    }}
                                >
                                    {(demand.length > 0 || supply.length > 0) &&
                                        <Box sx={{
                                            position: 'absolute',
                                            top: 4,
                                            left: 20,
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: 10,
                                            bgcolor: 'red',
                                            display: "none",
                                            "@media (max-width: 768px)": { display: "flex" },
                                            gap: 0.5,
                                        }} />
                                    }
                                    <FilterAltIcon sx={{ width: 16, height: 16 }} />
                                    <Box sx={{
                                        position: 'relative',
                                    }}>
                                        <Typography sx={{
                                            fontSize: 14,
                                            "@media (max-width: 768px)": { display: "none" },
                                        }}>필터</Typography>
                                    </Box>
                                </ButtonBase>
                            </Box>
                            {/* 모바일 필터 버튼 끝 */}
                            {/* 정렬 버튼 시작 */}
                            <TrendSortButton sort={sort} setSort={setSort} />
                            {/* 정렬 버튼 끝 */}
                        </Box>
                        {/* 리스트 헤더 영역 끝 */}
                        {/* 리스트 시작 */}
                        <Box sx={{
                            width: "100%", display: "grid",
                            gridTemplateColumns: `repeat(2, 1fr)`,
                            gap: 2,
                            pb: 5,
                            "@media (max-width: 768px)": {
                                py: 2,
                                px: 3,
                                gridTemplateColumns: `repeat(1, 1fr)`,
                                gap: 2,
                            },
                        }}>
                            {trendList.length > 0 &&
                                trendList.map((item, index) => (
                                    <TrendListItem
                                        key={index}
                                        item={item}
                                        isAll={isAll}
                                        selectedCategories={categories}
                                        selectedSupply={supply}
                                        selectedDemand={demand}
                                    />
                                ))}

                            <Box
                                ref={loaderRef}
                                sx={{
                                    py: 4,
                                    textAlign: "center",
                                    width: "100%",
                                }}
                            >
                                {isValidating && <CircularProgress size={28} />}
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Layout>

            {/* ✅ 모바일 Drawer */}
            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={handleCancel}
                sx={{
                    zIndex: 99999,
                    ".MuiPaper-root": {
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        maxHeight: "80vh",
                        bgcolor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 3,
                        borderBottom: `1px solid ${grey[300]}`,
                    }}
                >
                    <Typography sx={{ fontSize: 20, fontWeight: 700 }}>필터</Typography>
                    <CloseIcon onClick={() => setDrawerOpen(false)} sx={{ width: 24, height: 24 }} />
                </Box>

                <Box sx={{ flex: 1, overflow: "scroll" }}>
                    <TrendFilterSection
                        supply={tempSupply}
                        demand={tempDemand}
                        onChangeSupply={setTempSupply}
                        onChangeDemand={setTempDemand}
                    />
                </Box>

                <Box sx={{ p: 3, width: "100%", borderTop: `1px solid ${grey[300]}` }}>
                    <ButtonBase
                        onClick={handleConfirm}
                        sx={{
                            width: "100%",
                            borderRadius: 1,
                            bgcolor: amber[500],
                            height: 48,
                        }}
                    >
                        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>필터 적용하기</Typography>
                    </ButtonBase>
                </Box>
            </Drawer>
        </>
    );
}
