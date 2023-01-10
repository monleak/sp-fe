import { Box, Button, Dialog, DialogProps, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataDetailsExport } from "../../data/mockData";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import * as React from 'react';
import ChiTietDonHang from "./ChiTietDonHang";

const ChoXacNhan = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('lg');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { field: "id", headerName: "Mã Đơn Hàng", flex: 0.35 },
    { field: "doanhthu", headerName: "Doanh thu", flex: 1 },
    { field: "createdAt", headerName: "Ngày tạo", flex: 1 },
    { field: "status", headerName: "Trạng thái", flex: 1 },
    {
      field: "edit",
      headerName: "Xem thêm",
      flex: 0.3,
      renderCell: () => {
        return (
          <Button
            onClick={handleClickOpen}
            variant="text"
            startIcon={<RemoveRedEyeIcon style={{ color: "white" }}
            />}
          ></Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="" subtitle="Danh sách đơn hàng đã xác nhận" />
      <Box
        m="40px 0 0 0"
        height="58vh"
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
          rows={mockDataDetailsExport}
          columns={columns}
          disableSelectionOnClick
        />
      </Box>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <Box>
          <ChiTietDonHang />
        </Box>
      </Dialog>
    </Box>
  );
};

export default ChoXacNhan;
