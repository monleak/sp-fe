import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, FormControl, FormControlLabel, InputLabel, Modal, Select, SelectChangeEvent, Switch, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataDetailsExport } from "../../data/mockData";
import Header from "../../components/Header";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import React from "react";
import ChiTietDonHang from "./ChiTietDonHang";
import { MenuItem } from "react-pro-sidebar";
import { Order, Product, Receiver } from './type';
import { API_SP05_URL } from "../../utils/config";


const ChoXacNhan = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [receiver, setReceiver] = React.useState<Receiver>({});
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('lg');
  const [update, setUpdate] = React.useState(0);

  const handleClickOpen = function handleClickOpen({ products, receiver }: { products: Product[]; receiver: Receiver; }) {
    setOpen(true);
    setProducts(products);
    setReceiver(receiver);
  };
  React.useEffect(() => {
    fetch(API_SP05_URL + "order?status=PENDING")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data.orders);
      }
      );
  }, [update]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };
  const columns = [
    { field: "orderId", headerName: "ID Hóa đơn", flex: 0.5 },
    { field: "createdAt", headerName: "Ngày tạo", flex: 1 },
    {
      field: "cod", headerName: "Tổng Tiền", flex: 1, renderCell: function f(data: any) {
        let cod: number = data.row.cod;
        return (
          <>
            {cod.toLocaleString()} VNĐ
          </>);
      }
    },
    { field: "status", headerName: "Trạng Thái", flex: 1 },
    { field: "payment_method", headerName: "Phương thức", flex: 1 },
    {
      field: "detail",
      headerName: "Chi tiết",
      flex: 0.5,
      renderCell: (data: any) => {
        return (
          <Button
            onClick={() => {
              handleClickOpen({ products: data.row.products, receiver: data.row.receiver });
            }}
            variant="text"
            startIcon={<RemoveRedEyeIcon style={{ color: "white" }}
            />}
          ></Button >
        );
      },
    },
    {
      field: "refuse",
      headerName: "",
      flex: 0.7,
      renderCell: (data: any) => {
        return (
          <Button
            onClick={() => {
              let orderId = data?.row?.orderId;
              fetch(API_SP05_URL + `reject/${orderId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                }
              })
                .then((res) => res.json())
                .then((dt) => {
                  let status = dt.status;
                  if (status === "success") {
                    // data.data.orders.filter((order: any) => order?.orderId !== orderId);
                    // setData(data.data.orders);
                    setUpdate(update + 1);
                  }
                })
            }}
            sx={{
              backgroundColor: colors.redAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "0 10px",

            }}
          >
            Từ Chối
          </Button>
        );
      },
    },
    {
      field: "accept",
      headerName: "",
      flex: 0.7,
      renderCell: (data: any) => {
        return (

          <Button
            onClick={() => {
              let orderId = data?.row?.orderId;
              fetch(API_SP05_URL + `confirm/order/${orderId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                }
              })
                .then((res) => res.json())
                .then((dt) => {
                  let status = dt.status;
                  if (status === "success") {
                    // data.data.orders.filter((order: any) => order?.orderId !== orderId);
                    // setData([...data.data.orders]);
                    setUpdate(update + 1);
                  }
                })
            }}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "0 10px",

            }}
          >
            Xác Nhận
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="0">
      <Typography m="40px 0 10px 10px">

      </Typography>
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
          getRowId={(row) => row.orderId}
          rows={data}
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
          <ChiTietDonHang
            products={products}
            receiver={receiver}
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default ChoXacNhan;
