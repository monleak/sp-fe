import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import ImportStoryList from "./scenes/list/ImportHistoryList";
// import Contacts from './scenes/contacts';
// import Bar from './scenes/bar';
import ImportProductsForm from "./scenes/form/ImportProductForm";
import Invoices from "./scenes/list/index";
// import Line from './scenes/line';
// import Pie from './scenes/pie';
// import FAQ from './scenes/faq';
// import Geography from './scenes/geography';
//import Calendar from './scenes/calendar/calendar';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import CreatePriceQuotation from "./scenes/form/CreatePriceQuotationForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Topbar from "./scenes/global/Topbar";

// Create query client to use react query
const queryClient = new QueryClient();

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode as any}>
        <ThemeProvider theme={theme as any}>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route
                  path="/importProductsForm"
                  element={<ImportProductsForm />}
                />
                <Route path="/importStoryList" element={<ImportStoryList />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route
                  path="/price-quotation/create"
                  element={<CreatePriceQuotation />}
                />
                {/* <Route path="/contacts" element={<Contacts />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} /> */}
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
