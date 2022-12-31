import { Box,Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info';
const SupplierList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Tên nhà cung cấp",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      flex: 1,
    },
    { field: "count", headerName: "Tổng số giao dịch", flex: 1 },
    { 
      field: "edit",
      headerName: "",
      renderCell: () => {
        return (
          <Button
            variant='text'
            startIcon={<EditIcon style={{ color: 'white' }} />}
          ></Button>
        );
      },
    },
    { 
      field: "delete",
      headerName: "",
      renderCell: () => {
        return (
          <Button
            variant='text'
            startIcon={<DeleteIcon style={{ color: 'white' }} />}
          ></Button>
        );
      },
    },
    { 
      field: "detail",
      headerName: "",
      renderCell: () => {
        return (
          <Button
            variant='text'
            startIcon={<InfoIcon style={{ color: 'white' }} />}
          ></Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Danh sách các nhà cung cấp " subtitle="" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Thêm nhà cung cấp
          </Button>
        </Box>
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
        }}
      >
        <DataGrid 
          rows={mockDataTeam}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box> 
    </Box>
  );
};

export default SupplierList;
