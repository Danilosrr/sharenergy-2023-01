import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import PasswordInput from "../components/PasswordInput";
import useAuth from "../hooks/useAuth";
import { api, SignInData } from "../services/api";

function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [remember, setRemember] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignInData>({
    username: "",
    password: "",
  });

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      bottom: 0,
      width: "100%",
      justifyContent: "space-around",
      alignItems: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      padding: "0 10px",
      alignItems: "center",
    },
    input: {
      width: "100%",
      backgroundColor: "#ffffff",
      backgroundClip: "content-box",
      marginBottom: "15px",
    },
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      console.log("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const { token } = (await api.signIn(formData)).data;
      signIn(token, remember);
      navigate("app/Home");
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        console.log(error);
      }
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRemember(e.target.checked);
  }

  return (
    <Box component={"form"} sx={styles.container} onSubmit={handleSubmit}>
      <img src={logo} alt="sharenergy logo" style={{ maxWidth: "150px" }} />
      <Box sx={styles.form}>
        <TextField
          variant="outlined"
          placeholder="usuário"
          name="username"
          sx={styles.input}
          onChange={handleInputChange}
          value={formData.username}
        />
        <PasswordInput
          name="password"
          sx={styles.input}
          onChange={handleInputChange}
          value={formData.password}
        />
        <FormControlLabel
          sx={{ marginBottom: "15px", alignSelf: "flex-start" }}
          control={<Checkbox checked={remember} onChange={handleCheckChange} />}
          labelPlacement="start"
          label="continuar conectado?"
        />
        <Box>
          <Button variant="contained" type="submit">
            Entrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SignIn;
