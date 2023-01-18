import { Box, Button, TextField, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import { api, ClientData } from "../services/api";

interface Props {
  refresh: Dispatch<SetStateAction<string>>;
  close: Dispatch<SetStateAction<boolean>>;
}
function NewClient({ refresh, close }: Props) {
  const { setMessage } = useAlert();
  const { token } = useAuth();
  const [formData, setFormData] = useState<Omit<ClientData, "id">>({
    name: "",
    email: "",
    address: "",
    cpf: "",
    phone: "",
  });

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      gap: "7px",
      padding: "10px",
    },
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (token) await api.postClient(formData, token);
      refresh(JSON.stringify(formData));
      close(false);
      console.log("post");
    } catch (error: any) {
      if (error.response?.status === 409)
        setMessage({ type: "error", text: error.response.data });
      else
        setMessage({
          type: "error",
          text: "error during client registration!",
        });
      console.log(error);
    }
  }

  return (
    <Box component={"form"} sx={styles.form} onSubmit={handleSubmit}>
        <Typography variant="body2">Register new user</Typography>
      <TextField
        name="name"
        variant="outlined"
        label="name"
        value={formData.name}
        onChange={handleInputChange}
        size="small"
      />
      <TextField
        name="email"
        variant="outlined"
        label="email"
        value={formData.email}
        onChange={handleInputChange}
        size="small"
      />
      <TextField
        name="address"
        variant="outlined"
        label="address"
        value={formData.address}
        onChange={handleInputChange}
        size="small"
      />
      <TextField
        name="cpf"
        variant="outlined"
        label="cpf"
        value={formData.cpf}
        onChange={handleInputChange}
        inputProps={{ maxLength: 11, pattern: "[0-9]{11}" }}
        size="small"
      />
      <TextField
        name="phone"
        label="phone"
        variant="outlined"
        value={formData.phone}
        onChange={handleInputChange}
        inputProps={{ maxLength: 11, pattern: "^[1-9]{2}9[0-9]{8}$" }}
        size="small"
      />
      <Button variant="contained" type="submit">submit</Button>
    </Box>
  );
}

export default NewClient;
