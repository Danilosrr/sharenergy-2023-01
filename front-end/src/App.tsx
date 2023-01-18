import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Alert from "./components/Alert";
import { MainApp } from "./components/Main";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/authContext";
import Clients from "./pages/Clients";
import DogPage from "./pages/DogPage";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import StatusPage from "./pages/StatusPage";

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#00A2A2", light: "#fff", dark: "#6F695D" },
      secondary: { main: "#D6DF27" },
      background: { default: "#F8F8F8", paper: "#fff" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="app" element={<MainApp />}>
              <Route path="/app/Home" element={<Home />} />
              <Route path="/app/Status" element={<StatusPage />} />
              <Route path="/app/Dog" element={<DogPage />} />
              <Route path="/app/Clients" element={<Clients />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Alert/>
      </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
