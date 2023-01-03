import { Box, Button, Typography, useTheme, IconButton,Chip, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataImportStoryList } from "../../data/mockData";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../components/Header";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import MoreOutlinedIcon from '@mui/icons-material/MoreOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const RequestImportList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID",flex: 0.1 },
    { field: "supplier_id", headerName: "ID nhà cung cấp", flex: 0.5 },
    { field: "supplier", headerName: "Nhà cung cấp ", flex: 1 },
    { field: "product_id", headerName: "ID sản phẩm", flex: 0.5 },
    { field: "product", headerName: "Sản phẩm ", flex: 1 },
    {
      field: "quantity",
      headerName: "Số lượng",
      flex: 1,
    },
    {
      field: "total_cost",
      headerName: "Tổng số tiền",
      flex: 1,
      renderCell: (params: any) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      renderCell: (param: any) => {
        return <Chip color="warning" variant="outlined" label="Waiting" />;
      },
    },
    {
      field: "createdAt",
      headerName: "Thời gian nhập ",
      flex: 1,
    },
    {
      field: "more",
      headerName: "",
      flex: 0.3,
      renderCell: () => {
        return (
            <Button
                variant="text"
                startIcon={<MoreOutlinedIcon style={{ color: "white" }} />}
            ></Button>
        );
      },
    },
    {
        field: "delete",
        headerName: "",
        flex: 0.3,
        renderCell: () => {
          return (
            <Button
            variant="text"
            startIcon={<DeleteForeverIcon style={{ color: "white" }} />}
            ></Button>
          );
        },
      },
  ];

  return (
    <Box m="20px">
      <Header title="Danh sách" subtitle="Danh sách lịch sử nhập hàng" />
      <IconButton color="success" aria-label="add to shopping cart">
        <PlaylistAddIcon />Thêm yêu cầu nhập hàng
      </IconButton>
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

export default RequestImportList;
