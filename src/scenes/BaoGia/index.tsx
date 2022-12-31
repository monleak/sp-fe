import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam, mockDataInvoices} from "../../data/mockData";
import Header from "../../components/Header";


const BaoGia = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "SupplierID" },
    {
      field: "name",
      headerName: "Tên nhà cung cấp",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "unit_price",
      headerName: "Giá bán",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Báo giá của 1 sản phẩm của tất cả các nhà cung cấp" subtitle="" />
        </Box>
        <Box>
            <p>ID: query để lấy id của sản phẩm</p>
            <p>Tên sản phẩm: query lấy tên sản phẩm</p>
        </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid 
          checkboxSelection 
          rows={mockDataTeam}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box> 
    </Box>
  );
};

export default BaoGia;
