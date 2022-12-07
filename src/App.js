import "./App.css";
import { Link } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { HashRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { registerChartJs } from "./utils/register-chart-js";
import { createEmotionCache } from "./utils/create-emotion-cache";
import { theme } from "./theme";

registerChartJs();

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <Routes>
            <Route index path="/" element={<Dashboard />}></Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
