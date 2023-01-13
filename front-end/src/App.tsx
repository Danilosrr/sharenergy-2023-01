import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#7431F4", light: "#fff", dark: "#7431F4" },
      secondary: { main: "#7431F4" },
      background: { default: "#121212", paper: "#fff" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="app" element={<></>}>
            <Route path="/app/Home" element={<></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
