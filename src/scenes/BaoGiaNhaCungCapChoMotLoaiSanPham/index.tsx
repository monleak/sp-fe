// import * as React from 'react';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

// export default function BaoGia() {
//   const [age, setAge] = React.useState('');

//   const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value);
//   };

//   return (
//     <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
//       <InputLabel id="demo-select-small">Age</InputLabel>
//       <Select
//         labelId="demo-select-small"
//         id="demo-select-small"
//         value={age}
//         label="Age"
//         onChange={handleChange}
//       >
//         <MenuItem value="">
//           <em>None</em>
//         </MenuItem>
//         <MenuItem value={10}>Ten</MenuItem>
//         <MenuItem value={20}>Twenty</MenuItem>
//         <MenuItem value={30}>Thirty</MenuItem>
//       </Select>
//     </FormControl>

//   );
// }
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
  ];

  return (
    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Thông tin chi tiết nhà cung cấp" subtitle="" />
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
                Gía chi tiết 1 sản phẩm
            </Button>
            </Box>
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
