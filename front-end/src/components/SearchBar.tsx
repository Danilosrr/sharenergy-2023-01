import { Dispatch, ChangeEvent, SetStateAction, useState } from "react";
import {
  Box,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchData, UsersData } from "../services/api";

interface Props {
  list: UsersData[] | undefined;
  setList: Dispatch<SetStateAction<UsersData[]>>;
  setSearch: Dispatch<SetStateAction<boolean>>;
}

function SearchBar({ list, setList, setSearch }: Props) {
  const [formData, setFormData] = useState<SearchData>({
    filter: "",
    search: "",
  });

  const style = {
    Bar: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      padding: "0 5px",
      gap: "5px",
    },
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.filter || !list) return;

    searchUsers(formData, list);
  }

  function handleInputChange(
    e:
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function searchUsers(formData: SearchData, list: UsersData[]) {
    const { filter, search } = formData;

    setSearch(!!search);

    if (filter === "name") {
      const filteredList = list.filter((item) =>
        `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()}`.includes(
          search.toLowerCase()
        )
      );
      setList(filteredList);
    }

    if (filter === "email") {
      const filteredList = list.filter((item) =>
        item.email.toLowerCase().includes(search.toLowerCase())
      );
      setList(filteredList);
    }

    if (filter === "username") {
      const filteredList = list.filter((item) =>
        item.login.username.toLowerCase().includes(search.toLowerCase())
      );
      setList(filteredList);
    }
  }

  return (
    <Box component={"form"} sx={style.Bar}>
      <OutlinedInput
        size="small"
        placeholder="Search"
        name="search"
        onChange={handleInputChange}
        endAdornment={
          <IconButton onClick={handleSubmit}>
            <SearchIcon fontSize="small" />
          </IconButton>
        }
      />
      <Select
        value={formData.filter}
        onChange={handleInputChange}
        size="small"
        name="filter"
        autoWidth
        displayEmpty
      >
        <MenuItem disabled>filter</MenuItem>
        <MenuItem value={"username"}>user</MenuItem>
        <MenuItem value={"email"}>email</MenuItem>
        <MenuItem value={"name"}>name</MenuItem>
      </Select>
    </Box>
  );
}

export default SearchBar;
