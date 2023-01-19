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
import SearchBar from "../components/SearchBar";
import { api, UsersData } from "../services/api";

function Home() {
  const [allUsers, setAllUsers] = useState<UsersData[] | undefined>(undefined);
  const [users, setUsers] = useState<UsersData[]>([]);
  const [usersPaginated, setUsersPaginated] = useState<UsersData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [resultsTotal, setResultsTotal] = useState<number>(100);
  const [search, setSearch] = useState<boolean>(false);

  const style = {
    item: { marginBottom: "5px", backgroundColor: "#ffffff" },
    info: { display: "flex", gap: "5px" },
  };
  const pageSize = 10;

  async function initializeUsers(resultsTotal: number) {
    const users = (await api.getUsers(resultsTotal)).data.results;
    setAllUsers(users);
    paginateUsers(page, users);
  }

  function paginateUsers(page: number, users: UsersData[]) {
    const indexLast = page * pageSize;
    const indexFirst = indexLast - pageSize;
    const usersPaginated = users.slice(indexFirst, indexLast);
    setUsersPaginated(usersPaginated);
    setResultsTotal(users.length);
  }

  useEffect(() => {
    if (!allUsers) initializeUsers(resultsTotal);
    else {
      if (search) paginateUsers(page, users);
      else paginateUsers(page, allUsers);
    }
    // eslint-disable-next-line
  }, [page, users]);

  return (
    <>
      <Pagination
        limit={Math.ceil(resultsTotal / pageSize)}
        value={page}
        setValue={setPage}
      />
      <SearchBar list={allUsers} setList={setUsers} setSearch={setSearch} />
      <List sx={{ overflowY: "auto", overflowX: "hidden", width: "100%" }}>
        {usersPaginated.length > 0 ? (
          usersPaginated.map((user: any) => {
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
