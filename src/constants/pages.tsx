import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FolderIcon from '@mui/icons-material/Folder';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export const PAGES = [
    { path: '/home', label: '홈', mobileLabel: '홈', icon: <HomeFilledIcon /> },
    { path: '/trend', label: '헬스케어 트렌드', mobileLabel: '트렌드', icon: <NewspaperIcon /> },
    { path: '/strategy', label: '전략 매트릭스', mobileLabel: '전략', icon: <WbSunnyIcon /> },
    { path: '/business', label: '기업 정보', mobileLabel: '기업', icon: <BusinessCenterIcon /> },
    { path: '/report', label: 'AI 인사이트 리포트', mobileLabel: 'AI 리포트', icon: <FolderIcon /> },
]
