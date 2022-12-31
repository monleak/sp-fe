import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataImportStoryList } from '../../data/mockData';
import EditIcon from '@mui/icons-material/Edit';
import Header from '../../components/Header';

const ImportHistoryList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'supplier_id', headerName: 'Id nhà cung cấp', flex: 0.5 },
    { field: 'supplier', headerName: 'Nhà cung cấp ', flex: 1 },
    { field: 'product_id', headerName: 'Id sản phẩm', flex: 0.5 },
    { field: 'product', headerName: 'Sản phẩm ', flex: 1 },
    {
      field: 'quantity',
      headerName: 'Số lượng',
      flex: 1,
    },
    {
      field: 'total_cost',
      headerName: 'Tổng số tiền',
      flex: 1,
      renderCell: (params: any) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Thời gian nhập ',
      flex: 1,
    },
    {
      field: 'eidt',
      headerName: '',
      flex: 0.3,
      renderCell: () => {
        return (
          <Button
            variant='text'
            startIcon={<EditIcon style={{ color: 'white' }} />}
          ></Button>
        );
      },
    },
  ];

  return (
    <Box m='20px'>
      <Header title='Danh sách' subtitle='Danh sách lịch sử nhập hàng' />
      <Box
        m='40px 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
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

export default ImportHistoryList;
