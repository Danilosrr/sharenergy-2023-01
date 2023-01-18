import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { api, ClientData } from "../services/api";
import { Dispatch, SetStateAction, useState } from "react";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";

interface Props {
  data: ClientData;
  refresh: Dispatch<SetStateAction<string>>;
}

function Client({ data, refresh }: Props) {
  const { token } = useAuth();
  const [edit, setEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<ClientData>(data);
  const { setMessage } = useAlert();

  const { cpf, phone } = data;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleDeletion() {
    try {
      if (token) await api.deleteClients({ id: data.id }, token);
      refresh(data.id);
    } catch (error: any) {
      setMessage({ type: "error", text: "error during delete operation!" });
      console.log(error);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (token) await api.updateClient(formData, token);
      refresh(JSON.stringify(formData));
      setEdit(false);
    } catch (error: any) {
      if (error.response?.status === 409)
        setMessage({ type: "error", text: error.response.data });
      else
        setMessage({ type: "error", text: "error during update operation!" });
      console.log(error);
    }
  }

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      gap: "7px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
    },
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: "15px" }}>
      <CardActionArea>
        <CardContent>
          {edit ? (
            <Box
              component={"form"}
              sx={styles.form}
              id={data.id}
              onSubmit={handleUpdate}
            >
              <Typography variant="body1">{formData.name}</Typography>
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
            </Box>
          ) : (
            <>
              <Typography variant="body1">{data.name}</Typography>
              <Typography variant="body2">
                <b>email: </b>
                {data.email}
              </Typography>
              <Typography variant="body2">
                <b>address: </b>
                {data.address}
              </Typography>
              <Typography variant="body2">
                <b>cpf: </b>
                {`${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
                  6,
                  9
                )}-${cpf.slice(9)}`}
              </Typography>
              <Typography variant="body2">
                <b>phone: </b>
                {`(${phone.slice(0, 2)}) ${phone[3]} ${phone.slice(
                  2,
                  6
                )}-${phone.slice(6)}`}
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton onClick={handleDeletion}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => setEdit(!edit)}>
          <EditIcon fontSize="small" />
        </IconButton>
        {edit ? (
          <Box sx={styles.buttonContainer}>
            <Button
              variant="contained"
              type="submit"
              form={data.id}
              sx={{ fontSize: "10px" }}
              size="small"
            >
              confirm
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  );
}

export default Client;
