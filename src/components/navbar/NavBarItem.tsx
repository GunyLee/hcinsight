import { Box, ButtonBase, Typography } from "@mui/material";
import { blueGrey, red } from "@mui/material/colors";
import { useRouter } from "next/router";

export default function NavBarItem(item: any) {
    const router = useRouter();
    const focused = router.asPath.startsWith(item.path);
    const handleClick = () => {
        router.push(item.path);
    }
    return <ButtonBase
        onClick={handleClick}
        sx={{
            flex: 'initial',
            display: item.label === '마이페이지' || item.label === '홈' ? 'none' : 'flex',
            position: 'relative',
            transition: 'all 0.3s ease',
            ' .MuiTouchRipple-root': {
                display: 'none',
            },
            ' *': {
                transition: 'all 0.3s ease',
            },
            '@media (max-width: 768px)': {
                flex: 1,
                display: 'flex !important',
                ' .MuiTouchRipple-root': {
                    display: 'initial',
                },
            },
        }}>
        {/* 컨테이너 시작 */}
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pt: 3,
            pb: 2,
            opacity: focused || router.asPath.startsWith('/home') ? 1 : 0.2,
            '@media (max-width: 768px)': {
                flex: 1,
                height: "64px",
                px: 0,
                pt: 0,
                pb: 0,
                opacity: focused ? 1 : 0.2,
            },
        }}>
            {/* 모바일 아이콘 시작 */}
            <Box sx={{
                mt: 0.25,
                width: 24,
                height: 24,
                display: 'none',
                justifyContent: 'center',
                alignItems: 'center',
                ' *': {
                    transition: 'all 0.3s ease',
                    fontSize: `28px !important`,
                },
                '@media (max-width: 768px)': {
                    display: 'flex'
                }
            }}>
                {item.icon}
            </Box>
            {/* 모바일 아이콘 끝  */}
            {/* 라벨 시작 */}
            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                '@media (max-width: 768px)': {
                    height: 'initial',
                    mt: 0.5,
                }
            }}>
                <Typography sx={{
                    position: 'relative',
                    fontSize: 16,
                    lineHeight: '24px',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    '@media (max-width: 768px)': {
                        display: 'none',
                        fontSize: 12,
                        lineHeight: '16px',
                    },
                }}>
                    {item.label}
                </Typography>
                <Typography sx={{
                    position: 'relative',
                    fontSize: 16,
                    lineHeight: '24px',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    display: 'none',
                    '@media (max-width: 768px)': {
                        display: 'flex',
                        fontSize: 12,
                        lineHeight: '16px',
                    },
                }}>
                    {item.mobileLabel}
                </Typography>
                {item.mobileLabel === '트렌드' && <Typography
                    sx={{
                        fontSize: 10,
                        lineHeight: '14px',
                        ml: 0.5,
                        color: red[500],
                        fontWeight: 700,
                        '@media (max-width: 768px)': {
                            fontSize: 8,
                            lineHeight: '10px',
                            display: 'none',
                        }

                    }}
                >NEW</Typography>}
                {/* 라벨 끝 */}
            </Box>
            {/* 라벨 끝 */}
        </Box>
        {/* 컨테이너 끝 */}
        {/* 하단 인디케이터 시작 */}
        <Box sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: focused ? blueGrey[900] : 'transparent',
            '@media (max-width: 768px)': {
                display: 'none',
            },
            height: 2,
            zIndex: 99,
        }} />
        {/* 하단 인디케이터 끝 */}
    </ButtonBase >
}
