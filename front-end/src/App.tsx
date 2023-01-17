import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainApp } from "./components/Main";
import { AuthProvider } from "./contexts/authContext";
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
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="app" element={<MainApp />}>
              <Route path="/app/Home" element={<Home />} />
              <Route path="/app/Status" element={<StatusPage />} />
              <Route path="/app/Dog" element={<DogPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
