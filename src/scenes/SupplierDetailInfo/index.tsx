import { Box,Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam, products , productData} from "../../data/mockData";
import Header from "../../components/Header";


const SupplierDetailInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "productID" },
    {field: "subpdid", headerName: "SubID"},
    {
      field: "name",
      headerName: "Tên sản phẩm",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "unit_price",
      headerName: "Giá bán",
      flex: 1,
    },
    {
      field: "note",
      headerName: "Ghi chú",
      flex: 1,
    },
    { 
      field: "detail",
      headerName: "",
      renderCell: () => {
        return (
          <Button style={{color: 'yellow'}}>
            Báo giá của sản phẩm 
          </Button>
        );
      },
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Thông tin chi tiết nhà cung cấp" subtitle="" />
        </Box>
        <Box>
            <p>ID:{productData.id}</p>
            <p>Tên nhà cung cấp: {productData.name}</p>
            <p>Số điện thoại: {productData.phone}</p>
            <p>Email: {productData.email}</p>
            <p>Địa chỉ:</p>
            <ol>
                {productData.address.map((add) => <li>{add}</li>)}
            </ol>
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

export default SupplierDetailInfo;

