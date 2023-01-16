import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { api } from "../services/api";

function Home() {
  const [page, setPage] = useState<number>(1);
  const [users, setUsers] = useState([]);

  const style = {
    item: { marginBottom: "5px", backgroundColor: "#ffffff" },
    info: { display: "flex", gap: "5px" },
  };

  async function handleUsers(page: number) {
    const users = (await api.getUsers(page)).data;
    setUsers(users.results);
    console.log(users.results);
  }

  useEffect(() => {
    handleUsers(page);
  }, [page]);

  return (
    <>
      <Pagination limit={10} value={page} setValue={setPage} />
      <List sx={{ overflowY: "auto", overflowX: "hidden", width: "100%" }}>
        {users.length > 0 ? (
          users.map((user: any) => {
            const { name, email, login, picture, dob } = user;
            return (
              <ListItem
                key={login.username}
                alignItems="flex-start"
                sx={style.item}
              >
                <ListItemAvatar>
                  <Avatar alt="avatar" src={picture.thumbnail} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${name.first} ${name.last}`}
                  secondary={
                    <>
                      <Typography variant="caption">{email}</Typography>
                      <Typography component={"span"} sx={style.info}>
                        <Typography variant="caption">
                          <b>user:</b> {login.username}
                        </Typography>
                        <Typography variant="caption">
                          <b>idade:</b> {dob.age}
                        </Typography>
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            );
          })
        ) : (
          <></>
        )}
      </List>
    </>
  );
}

export default Home;
