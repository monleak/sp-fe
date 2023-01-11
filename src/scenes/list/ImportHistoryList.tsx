import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataImportStoryList } from "../../data/mockData";
import EditIcon from "@mui/icons-material/Edit";
import Header from "../../components/Header";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getImportHistoryList } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import usePreserveQueryNavigate from "../../hooks/usePreserveQueryNavigate";

const ImportHistoryList = () => {
  // url param
  const navigate = usePreserveQueryNavigate();
  // api
  const { data: importHistoryList, isLoading: isImportHistoryListLoading } =
    useQuery(
      ["history-list"],
      () => {
        return getImportHistoryList();
      },
      {
        select: (data) => {
          return data.map((item: any) => {
            return {
              ...item,
              key: item.id,
              product: "abc",
              supplier: item?.SupplierModel?.name,
            };
          });
        },
      }
    );

  //theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "supplier", headerName: "Nhà cung cấp ", flex: 1 },
    { field: "product", headerName: "Sản phẩm ", flex: 1 },
    { field: "product_id", headerName: "Id Product", flex: 0.5 },
    { field: "subproduct_id", headerName: "Id Subproduct", flex: 0.5 },
    {
      field: "quantity",
      headerName: "Số lượng",
      flex: 0.7,
    },
    {
      field: "unit_price",
      headerName: "Đơn giá",
      flex: 0.7,
    },
    {
      field: "total_cost",
      headerName: "Tổng số tiền",
      flex: 0.7,
      renderCell: (params: any) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.total_cost} đ
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 0.7,
    },
    {
      field: "createdAt",
      headerName: "Thời gian nhập ",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "",
      flex: 0.3,
      renderCell: (param: GridRenderCellParams<any, any, any>) => {
        return (
          <Button
            variant="text"
            startIcon={<EditIcon style={{ color: "white" }} />}
            onClick={() => {
              navigate(`/imports/update/${param.row?.id}`, {
                state: param.row,
              });
            }}
          ></Button>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Danh sách" subtitle="Danh sách lịch sử nhập hàng" />
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
          rows={importHistoryList || []}
          columns={columns}
          loading={isImportHistoryListLoading}
        />
      </Box>
    </Box>
  );
};

export default ImportHistoryList;
