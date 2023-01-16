import { Dispatch, SetStateAction } from "react";
import { Box, Button, Chip, SxProps, Theme } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  sx?: SxProps<Theme>;
  limit?: number;
}

function Pagination({ value, setValue, limit, sx }: Props) {
  const style = {
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      padding: "5px",
      position: "relative",
    },
  };

  function handleFirstPage() {
    if (value === 1) return;
    setValue(1);
  }

  function handleNextPage() {
    if (limit && value >= limit) return;
    setValue(value + 1);
  }

  function handleBeforePage() {
    if (value > 1) setValue(value - 1);
  }

  return (
    <Box sx={style.pagination}>
      <Button
        startIcon={<KeyboardDoubleArrowLeftIcon />}
        onClick={handleFirstPage}
        sx={{ position: "absolute", left: 0 }}
      />
      <Button endIcon={<NavigateBeforeIcon />} onClick={handleBeforePage} />
      <Chip label={value} clickable />
      <Button startIcon={<NavigateNextIcon />} onClick={handleNextPage} />
    </Box>
  );
}

export default Pagination;
