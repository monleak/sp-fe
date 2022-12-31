import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";

import SupplierList from "./scenes/SupplierList";
import Form from "./scenes/createNewSupplierForm";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import SupplierDetailInfo from "./scenes/SupplierDetailInfo";
import BaoGia from "./scenes/BaoGia";
import Team from "./scenes/team";
import ImportStoryList from "./scenes/list/ImportHistoryList";
import ImportProductsForm from "./scenes/form/ImportProductForm";
import Invoices from "./scenes/list/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import CreatePriceQuotation from "./scenes/form/CreatePriceQuotationForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Topbar from "./scenes/global/Topbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PriceQuotationList from "./scenes/list/priceQuotationList";

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
                <Route path="/supplierlist" element={<SupplierList />} />
              <Route path="/createNewSupplierForm" element={<Form />} />
              <Route path="/SupplierDetailInfo" element={<SupplierDetailInfo />} />
              <Route path="/BaoGia" element={<BaoGia />} />
                <Route
                  path="/importProductsForm"
                  element={<ImportProductsForm />}
                />
                <Route path="/importStoryList" element={<ImportStoryList />} />
                <Route path="/invoices" element={<Invoices />} />
                {/* Price quotation */}
                <Route
                  path="/price-quotation/create"
                  element={<CreatePriceQuotation />}
                />
                <Route
                  path="/import/:importRequestId/price-quotation/create"
                  element={<CreatePriceQuotation />}
                />
                <Route
                  path="/import/:importRequestId/price-quotation-list"
                  element={<PriceQuotationList />}
                />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;