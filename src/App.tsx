import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";

import SupplierList from "./scenes/SupplierList";
import SupplierDetailInfo from "./scenes/SupplierDetailInfo";
import ImportProductsForm from "./scenes/form/ImportProductForm";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import CreatePriceQuotation from "./scenes/PriceQuotation/CreatePriceQuotationForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Topbar from "./scenes/global/Topbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PriceQuotationList from "./scenes/PriceQuotation/PriceQuotationList";
import ImportHistoryList from "./scenes/list/ImportHistoryList";
import NestedRouteModal from "./components/modal/NestedRouteModal";
import UpdatePriceQuotationForm from "./scenes/PriceQuotation/UpdatePriceQuotationForm";
import RequestImportList from "./scenes/list/requestImportList";
import NotFound from "./scenes/NotFound";
import CreateSupplier from "./scenes/SupplierList/CreateSupplierForm";

// Create query client to use react query
const queryClient = new QueryClient();

function App() {
  const [theme, colorMode] = useMode();

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
                {/* <Route path="/team" element={<Team />} /> */}
                {/* ======================================== Supplier ============================================== */}
                <Route path="/suppliers" element={<SupplierList />} />
                <Route path="/suppliers/create" element={<CreateSupplier />} />
                <Route path="/suppliers/:id" element={<SupplierDetailInfo />} />
                {/* <Route path="/BaoGia" element={<BaoGia />} /> */}
                {/* ======================================== Import ============================================== */}
                <Route
                  path="/imports/create"
                  element={<ImportProductsForm />}
                />
                <Route
                  path="/imports/history"
                  element={<ImportHistoryList />}
                />
                {/* ======================================== Price quotation ============================================== */}
                <Route
                  path="/imports/request"
                  element={<RequestImportList />}
                />
                <Route
                  path="/price-quotations/create"
                  element={<CreatePriceQuotation />}
                />
                <Route
                  path="/imports/:importRequestId/price-quotation-list/"
                  element={<PriceQuotationList />}
                >
                  {/* Nested route */}
                  <Route
                    path="/imports/:importRequestId/price-quotation-list/create"
                    element={
                      <NestedRouteModal>
                        <CreatePriceQuotation />
                      </NestedRouteModal>
                    }
                  />
                  <Route
                    path="/imports/:importRequestId/price-quotation-list/update/:priceQuotationId"
                    element={
                      <NestedRouteModal>
                        <UpdatePriceQuotationForm />
                      </NestedRouteModal>
                    }
                  />
                  {/* Nested route */}
                </Route>
                {/* ========================================  ============================================== */}
                {/* ... */}
                {/* ======================================== END ============================================== */}
                <Route path="*" element={<NotFound />} />
                {/* ======================================== END ============================================== */}
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
      {/* development */}
      <ReactQueryDevtools />
      {/* development */}
    </QueryClientProvider>
  );
}

export default App;
