import { Box, IconButton, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";

function StatusPage() {
  const [statusCode, setStatusCode] = useState<number>(0);
  const [formStatus, setFormStatus] = useState<number>(0);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFormStatus(+e.target.value);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatusCode(formStatus);
  }

  return (
    <Box component={"form"} sx={styles.container} onSubmit={handleSubmit}>
      <OutlinedInput
        type="number"
        size="small"
        placeholder="Status code"
        name="status"
        sx={{ marginTop: "5px" }}
        onChange={handleInputChange}
        endAdornment={
          <IconButton type="submit">
            <SearchIcon fontSize="small" />
          </IconButton>
        }
      />
      <Box sx={styles.imageContainer}>
        {!!statusCode ? (
          <Box
            component={"img"}
            alt={"http code " + statusCode}
            src={`https://http.cat/${statusCode}`}
            sx={{ maxHeight: "80%", maxWidth: "100%" }}
          />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}

export default StatusPage;
