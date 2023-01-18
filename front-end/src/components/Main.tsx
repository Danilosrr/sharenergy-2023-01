import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Toolbar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export function MainApp() {
  const { token, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      bottom: 0,
      width: "100%",
    },
  };

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/");
  }

  useEffect(() => {
    if (!token) handleSignOut();
  });

  return (
    <>
      <Box sx={style.container}>
        <AppBar position="static">
          <Toolbar disableGutters>
            <IconButton onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={() => navigate("/app/Home")}>página 1</MenuItem>
              <MenuItem onClick={() => navigate("/app/Status")}>página 2</MenuItem>
              <MenuItem onClick={() => navigate("/app/Dog")}>página 3</MenuItem>
              <MenuItem onClick={() => navigate("/app/Clients")}>página 4</MenuItem>
            </Menu>
            <Box flexGrow={1} />
            <Tab
              label="logout"
              iconPosition="end"
              icon={<LogoutIcon onClick={handleSignOut} />}
            />
          </Toolbar>
        </AppBar>
        <Outlet />
      </Box>
    </>
  );
}
