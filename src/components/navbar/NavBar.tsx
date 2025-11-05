import { Box, Button, ButtonBase, Menu, MenuItem, Typography } from "@mui/material"
import { useRouter } from "next/router";
import { blueGrey } from "@mui/material/colors";
import { useSession, signOut } from "next-auth/react";
import Layout from "../common/Layout";
import Image from "next/image";
import NavBarItem from "./NavBarItem";
import { useState } from "react";
import { PAGES } from "@/src/constants/pages";
import Input from "../common/Input";
import SearchIcon from "@mui/icons-material/Search";

export default function NavBar() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        handleCloseMenu();
        console.log("로그아웃 실행");
        signOut({ callbackUrl: "/auth/login" })
    };
    if (router.pathname === '/' || router.pathname.startsWith('/auth')) return null;
    return <>
        {/* 상단네비 / 하단네비 */}
        {/* 웹 영역 보장 시작 */}
        <Box sx={{
            height: 56 + 64,
            '@media (max-width: 768px)': {
                height: 80,
            }
        }} />
        {/* 웹 영역 보장 끝 */}
        {/* 헤더 시작 */}
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
        }}>
            {/* 컨테이너 시작 */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                px: 10,
                minWidth: 1280,
                maxWidth: 1280,
                mx: "auto",
                pt: 3,
                pb: 0,
                bgcolor: '#ffffff',
                '@media (max-width: 768px)': {
                    px: 3,
                    pt: 3,
                    pb: 3,
                    minWidth: 'initial',
                    maxWidth: 'initial',
                    mx: "initial",
                    width: '100%',
                },
            }}>
                {/* 로고 시작 */}
                <ButtonBase
                    disableRipple
                    onClick={() => { router.push('/home') }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '@media (max-width: 768px)': {
                            display: !router.asPath.startsWith('/home') ? 'none' : 'flex'
                        }
                    }}>
                    <Image
                        src="/images/favicon/apple-icon-180x180.png" // public/logo.png
                        alt=""
                        width={20}
                        height={20}
                        unoptimized
                        style={{
                            width: 20,
                            height: 20,
                            marginRight: 8,
                            borderRadius: 4,
                        }}
                    />
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 20,
                                lineHeight: '20px',
                                fontWeight: 700,
                                fontFamily: `'Kakao', 'Pretendard', sans-serif`,
                                '& span': {
                                    fontWeight: 400,
                                    ml: 0.5,
                                }
                            }}
                        >
                            HC<span>INSIGHT</span>
                        </Typography>
                    </Box>
                </ButtonBase>
                {/* 로고 끝 */}
                {/* 텍스트 시작 */}
                <Typography sx={{
                    fontSize: 24,
                    lineHeight: '32px',
                    fontWeight: 700,
                    display: 'none',
                    '@media (max-width: 768px)': {
                        display: router.asPath.startsWith('/home') ? 'none' : 'block',
                    },
                }}>
                    {PAGES.find(item => item.path === router.pathname)?.label}
                </Typography>
                {/* 텍스트 끝 */}
                {/* 우측 시작 */}
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 2,
                }}>
                    {/* 검색 시작 */}
                    <Box sx={{
                        '@media (max-width: 768px)': {
                            display: 'none',
                        }
                    }}>
                        <Input
                            value=""
                            onChange={() => { }}
                            onSubmit={() => { }}
                        />
                    </Box>
                    <Box sx={{
                        display: 'none',
                        '@media (max-width: 768px)': {
                            display: 'flex',
                        }
                    }}>
                        <SearchIcon sx={{ fontSize: 32, color: blueGrey[900] }} />
                    </Box>
                    {/* 검색 끝 */}
                    {/* 웹 유저 시작 */}
                    <ButtonBase
                        disableRipple
                        onClick={() => { router.push('/user') }}
                        sx={{
                            position: 'relative',
                            borderRadius: 40,
                            width: 32,
                            height: 32,
                            overflow: 'hidden',
                            bgcolor: blueGrey[50]
                        }}>
                        <Box>
                            {session?.user?.image && session?.user?.image !== "" ?
                                <Image
                                    src={session?.user?.image ? `${session?.user?.image}` : ""} // public/logo.png
                                    alt=""
                                    width={20}
                                    height={20}
                                    unoptimized
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                                : <></>
                            }
                        </Box>
                    </ButtonBase>
                    {/* 웹 유저 끝 */}
                </Box>
                {/* 우측 끝 */}
            </Box>
            {/* 컨테이너 끝 */}
        </Box>
        {/* 헤더 끝 */}
        {/* 네비바 시작 */}
        <Box sx={{
            position: 'fixed',
            top: 56,
            left: 0,
            right: 0,
            zIndex: 9998,
            borderBottom: `1px solid ${blueGrey[50]}`,
            '@media (max-width: 768px)': {
                position: 'fixed',
                top: 'initial',
                left: 0,
                right: 0,
                bottom: 0,
                borderBlottom: 'none',
            },
        }}>
            {/* 컨테이너 시작 */}
            <Box sx={{
                px: 10,
                minWidth: 1280,
                maxWidth: 1280,
                mx: "auto",
                display: 'flex',
                bgcolor: '#ffffff',
                gap: 4,
                '@media (max-width: 768px)': {
                    minWidth: 'initial',
                    maxWidth: 'initial',
                    mx: "initial",
                    width: '100%',
                    px: 0,
                    gap: 0,
                    borderBottom: `none`,
                    borderTop: `1px solid ${blueGrey[50]}`,
                },
            }}>
                {PAGES.map((item, index) => {
                    return <NavBarItem key={index} {...item} />
                })}
            </Box>
            {/* 컨테이너 끝 */}
        </Box>
        {/* 네비바 끝 */}
    </>
}