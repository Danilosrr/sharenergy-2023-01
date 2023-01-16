import { Dispatch, SetStateAction } from "react";
import { Box, Button, Chip, SxProps, Theme } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  sx?: SxProps<Theme>;
  limit: number;
}

function Pagination({ value, setValue, limit }: Props) {
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

  function handleLastPage() {
    setValue(limit);
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
      />
      <Button endIcon={<NavigateBeforeIcon />} onClick={handleBeforePage} />
      <Chip label={value} clickable />
      <Button startIcon={<NavigateNextIcon />} onClick={handleNextPage} />
      <Button
        startIcon={<KeyboardDoubleArrowRightIcon />}
        onClick={handleLastPage}
      />
    </Box>
  );
}

export default Pagination;
