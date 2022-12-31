import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataImportStoryList } from "../../data/mockData";
import Header from "../../components/Header";

const ImportStoryList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "supplier_id", headerName: "Supplier Id" },
    { field: "supplier", headerName: "Supplier ", flex: 1 },
    { field: "product_id", headerName: "Product Id" },
    { field: "product", headerName: "Product ", flex: 1 },
    { field: "subproduct_id", headerName: "Subproduct Id" },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "total_cost",
      headerName: "Total Cost",
      flex: 1,
      renderCell: (params: any) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "note",
      headerName: "Note",
      flex: 1,
    },
    {
      field: "created_by",
      headerName: "Created By",
      flex: 1,
    },
    {
      field: "update_by",
      headerName: "Updated By",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="List" subtitle="Import History List" />
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
          rows={mockDataImportStoryList}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default ImportStoryList;
