import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: blueGrey[50],
  borderRadius: 8,
  padding: "0px 8px",
  height: '32px',
  transition: "all 0.2s ease",
  border: "1px solid transparent",
  flex: 1,
  "&:focus-within": {
    backgroundColor: "#fff",
    borderColor: theme.palette.primary.main,
    boxShadow: "0 0 0 2px rgba(156, 39, 176, 0.15)",
  },
}));

const StyledInput = styled(InputBase)(() => ({
  flex: 1,
  fontSize: 14,
  lineHeight: "20px",
  paddingLeft: 6,
   "&::placeholder": {
    color: blueGrey[300], // ✅ placeholder 색상 변경 (회색 계열)
    opacity: 1,        // Safari 호환성용 (기본 0.6 → 1로)
  },
}));

export default function Input({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit?.();
    }
  };

  return (
    <SearchContainer>
      <SearchIcon sx={{ fontSize: 20, color: blueGrey[300] }} />
      <StyledInput
        placeholder="인사이트 검색"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        inputProps={{ inputMode: "search" }} // 모바일 키보드 '검색' 버튼으로 표시
      />
    </SearchContainer>
  );
}
