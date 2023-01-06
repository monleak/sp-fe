import { Box, Button, Typography, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { mockDataImportStoryList } from "../../data/mockData";
import * as yup from 'yup';
import { tokens } from "../../theme";
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import EditIcon from "@mui/icons-material/Edit";
import { display } from '@mui/system';
import Modal from '@mui/material/Modal';
import ModalChiTietXuatHang from './ModalChiTietXuatHang';
const ImportExportsForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const handleFormSubmit = (values: any) => {
    console.log(values);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID Đơn Hàng", flex: 0.75 },
    { field: "supplier_id", headerName: "", flex: 0.5 },
    { field: "supplier", headerName: "Nhà cung cấp ", flex: 1 },
    { field: "product_id", headerName: "Id sản phẩm", flex: 0.5 },
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
    },
    {
      field: "createdAt",
      headerName: "Thời gian nhập ",
      flex: 1,
    },
    {
      field: "eidt",
      headerName: "",
      flex: 0.3,
      renderCell: () => {
        return (
          <Button
            onClick={handleOpen}
            variant="text"
            startIcon={<EditIcon style={{ color: "white" }} />}
          ></Button>
        );
      },
    },
  ];

  return (
    <Box mt='20px' margin='0px 20px 0px 20px'>
      <Header title='Yêu Cầu Xuất Hàng' subtitle='Danh Sách Đơn Hàng Đã Xác Nhận ' />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
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
                checkboxSelection
                rows={mockDataImportStoryList}
                columns={columns}
                disableSelectionOnClick
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Tạo Phiếu Xuất Hàng
              </Button>
            </Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box >
                <React.Fragment>
                  <ModalChiTietXuatHang />
                </React.Fragment>
              </Box>
            </Modal>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  supplierId: yup.string().required('required'),
  productId: yup.string().required('required'),
  quantity: yup.string().required('required'),
  note: yup.string().required('required'),
});
const initialValues = {
  supplierId: '',
  productId: '',
  quantity: '',
  note: '',
};

export default ImportExportsForm;
