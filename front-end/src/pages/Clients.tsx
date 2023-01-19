import { useEffect, useState } from "react";
import { Drawer, Fab, List } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Client from "../components/Client";
import NewClient from "../components/NewClient";
import useAuth from "../hooks/useAuth";
import { api, ClientData } from "../services/api";

function Clients() {
  const [clientsList, setClientsList] = useState<ClientData[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<string>("");
  const { token } = useAuth();

  const styles = {
    list: {
      overflowY: "auto",
      overflowX: "hidden",
      width: "100%",
      padding: "10px",
    },
    button: { position: "absolute", bottom: 16, right: 16 },
  };
  
  async function getClients(token: string) {
    const clients = (await api.getClients(token)).data;
    setClientsList(clients);
  }

  useEffect(() => {
    if (!token) return;
    else getClients(token);
    // eslint-disable-next-line
  }, [refresh]);

  return (
    <>
      <Drawer anchor="left" open={openForm} onClose={() => setOpenForm(false)}>
        <NewClient refresh={setRefresh} close={setOpenForm} />
      </Drawer>
      <Fab color="primary" sx={styles.button} onClick={() => setOpenForm(true)}>
        <AddIcon />
      </Fab>
      <List
        sx={styles.list}
      >
        {clientsList.length > 0 ? (
          clientsList.map((client) => {
            const { id } = client;
            return (
              <Client data={client} key={id} refresh={setRefresh}></Client>
            );
          })
        ) : (
          <></>
        )}
      </List>
    </>
  );
}

export default Clients;
