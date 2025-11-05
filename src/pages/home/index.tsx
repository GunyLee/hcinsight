import Layout from "@/src/components/common/Layout";
import User from "@/src/components/common/User";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useSWR from "swr";
import { fetcher } from "@/src/lib/fetcher";
import TrendListItem from "@/src/components/trend/TrendListItem";
import Image from "next/image";
import { relative } from "path";
import { amber, blueGrey, teal } from "@mui/material/colors";

export default function HomePage() {
    const router = useRouter();
    const { data, error, isLoading } = useSWR("/api/trend?sort=latest&limit=10", fetcher);
    const trendList = data ? data.results : [];
    return <Layout>
        {/* 배너 시작 */}
        <Box sx={{
            position: 'relative',
            px: 10,
            py: 3,
            '@media (max-width: 768px)': {
                px: 3,
            },
        }}>
            <Box sx={{
                position: 'relative',
                width: '100%',
                height: 240,
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: amber[500],
                px: `100px`,
                '@media (max-width: 768px)': {
                    px: 3,
                    height: 100,
                }
            }}>
                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    ' img': {
                        position: 'absolute',
                        right: -40,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 400,
                        height: 400,
                        '@media (max-width: 768px)': {
                            width: 160,
                            height: 160,
                            right: -20,
                        },
                    },
                }}>
                    <Typography sx={{
                        fontSize: 28,
                        lineHeight: '36px',
                        fontWeight: 700,
                        color: blueGrey[900],
                        '& img': {
                            width: `80px !important`,
                            height: `80px !important`,
                        },
                        '@media (max-width: 768px)': {
                            fontSize: 16,
                            lineHeight: '20px',
                            '& img': {
                                width: 80,
                                height: 80,
                            },
                        },
                        zIndex: 1,
                    }}>
                        헬스케어 트렌드를 한눈에,<br />
                        HC INSIGHT 오픈
                    </Typography>
                    <Image
                        src='/images/bulb-dynamic-color.png'
                        alt=''
                        width={200}
                        height={200}
                        unoptimized
                    />
                </Box>
            </Box>
        </Box>
        {/* 배너 끝 */}
        {/* 메인 시작 */}
        <Box sx={{
            mt: 3,
        }}>
            {/* 섹션 시작 */}
            <Box sx={{
                px: 10,
                pb: 5,
                '@media (max-width: 768px)': {
                    px: 3,
                }
            }}>
                <Typography sx={{
                    fontSize: 20,
                    lineHeight: '28px',
                    fontWeight: 700,
                    mb: 3,
                }}>
                    어떤 트렌드가 궁금하세요?
                </Typography>
            </Box>
            {/* 섹션 끝 */}
            {/* 컨테이너 시작 */}
            <Box sx={{
                display: 'flex',
                '@media (max-width: 768px)': {
                    display: 'block',
                    gap: 0,
                }
            }}>
                {/* 섹션 시작 */}
                <Box sx={{
                    pb: 5,
                    flex: 1,
                    mr: -5,
                    '@media (max-width: 768px)': {
                        pb: 3,
                        flex: 0,
                        mr: 0,
                    }
                }}>
                    {/* 섹션 헤더 시작 */}
                    <Box sx={{
                        px: 10,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        '@media (max-width: 768px)': {
                            px: 3,
                        }
                    }}>
                        <Typography sx={{
                            fontSize: 20,
                            lineHeight: '28px',
                            fontWeight: 700,
                        }}>
                            최신 헬스케어 트렌드
                        </Typography>
                        {/* 더보기 시작 */}
                        <ButtonBase
                            onClick={() => {
                                router.push('/trend');
                            }}
                            sx={{
                            }}>
                            <Typography sx={{
                                fontSize: 12,
                                lineHeight: '16px',
                                fontWeight: 500,
                            }}>
                                더보기
                            </Typography>
                            <ChevronRightIcon sx={{
                                fontSize: 16,
                                ml: 0.5,
                            }} />
                        </ButtonBase>
                        {/* 더보기 끝 */}
                    </Box>
                    {/* 섹션 헤더 끝 */}
                    {/* 섹션 내용 시작 */}
                    <Box sx={{
                        px: 10,
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        '@media (max-width: 768px)': {
                            px: 3,
                            mt: 2,
                        }
                    }}>
                        {trendList.length > 0 && trendList.map((item: any, index: number) => (
                            <TrendListItem key={index} item={item} />
                        ))}
                    </Box>
                    {/* 섹션 내용 끝 */}
                </Box>
                {/* 섹션 끝 */}
                {/* 섹션 시작 */}
                <Box sx={{
                    pb: 5,
                    flex: 1,
                    mr: -5,
                    '@media (max-width: 768px)': {
                        pb: 3,
                        flex: 0,
                        mr: -5,
                    }
                }}>
                    {/* 섹션 헤더 시작 */}
                    <Box sx={{
                        px: 10,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        '@media (max-width: 768px)': {
                            px: 3,
                        }
                    }}>
                        <Typography sx={{
                            fontSize: 20,
                            lineHeight: '28px',
                            fontWeight: 700,
                        }}>
                            인기 트렌드 TOP 10
                        </Typography>
                        {/* 더보기 시작 */}
                        <ButtonBase
                            onClick={() => {
                                router.push('/trend');
                            }}
                            sx={{
                            }}>
                            <Typography sx={{
                                fontSize: 12,
                                lineHeight: '16px',
                                fontWeight: 500,
                            }}>
                                더보기
                            </Typography>
                            <ChevronRightIcon sx={{
                                fontSize: 16,
                                ml: 0.5,
                            }} />
                        </ButtonBase>
                        {/* 더보기 끝 */}
                    </Box>
                    {/* 섹션 헤더 끝 */}
                </Box>
                {/* 섹션 끝 */}
            </Box>
            {/* 컨테이너 끝 */}
        </Box>
    </Layout >
}