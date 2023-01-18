import { Box, Fab } from "@mui/material";
import { api } from "../services/api";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";

function DogPage() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    button: { position: "absolute", bottom: 16, right: 16 },
  };

  async function getImage() {
    const dog = await api.getDogImage();
    setImageUrl(dog);
    console.log(dog);
  }

  return (
    <Box sx={styles.container}>
      <Fab color="primary" sx={styles.button} onClick={getImage}>
        <RefreshIcon />
      </Fab>
      {!!imageUrl ? (
        <Box
          component={"img"}
          alt="dog image"
          src={imageUrl}
          sx={{
            maxHeight: "50%",
            maxWidth: "100%",
            boxSizing: "content-box",
          }}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}

export default DogPage;
