import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataDetailsExport } from "../../data/mockData";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import * as React from 'react';

const ChoXacNhan = () => {
  const navigate = useNavigate();
  const { importRequestId } = useParams();
  const id = Number.parseInt(importRequestId || "");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Mã Đơn Hàng", flex: 0.35 },
    { field: "doanhthu", headerName: "doanhthu", flex: 1 },
    { field: "ngaytao", headerName: "ngaytao", flex: 1 },
    { field: "trangthai", headerName: "trangthai", flex: 1 },
    {
      field: "edit",
      headerName: "xem them",
      flex: 0.3,
      renderCell: () => {
        return (
          <Button
            onClick={()=>{
              navigate(
                `/imports/${id}/history-export/show-details`
              );
            }}
            variant="text"
            startIcon={<RemoveRedEyeIcon style={{ color: "white" }} />}
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
    </Box>
  );
};

export default ChoXacNhan;
