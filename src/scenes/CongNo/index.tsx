import * as React from 'react';
import { Box, Button, colors, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { mockDataReceivable, mockDataCollected } from "./data";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { BootstrapDialog, BootstrapDialogTitle, DialogTitleProps } from "./Dialog";

const CongNo = () => {
  const clickHandler = (v: any) => {
    setContent(v.row);
    setOpen(true)
  }
  const closeHandler = () => {
    setOpen(false)
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let countRow = 0;
  let countRow1 = 0;
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState(Object);
  const columns = [
    { field: "stt", headerName: "STT", flex: 0.2 },
    { field: "id", headerName: "ID Hóa đơn", flex: 1 },
    { field: "date", headerName: "Ngày thu dự kiến", flex: 1 },
    { field: "price", headerName: "Số tiền", flex: 1 },
    {
      field: "info", headerName: "Chi tiết", flex: 0.5, renderCell: (v: any) => {

        return (
          <Button
            onClick={() => { clickHandler(v) }}
            variant="text"
            startIcon={<VisibilityIcon style={{ color: "white" }}
            />}
          ></Button >
        )
      }
    }
  ]
  const columns1 = [
    { field: "stt", headerName: "STT", flex: 0.2 },
    { field: "id", headerName: "ID Hóa đơn", flex: 1 },
    { field: "date", headerName: "Ngày hoàn thành", flex: 1 },
    { field: "price", headerName: "Số tiền", flex: 1 },
    {
      field: "info", headerName: "Chi tiết", flex: 0.5, renderCell: (v: any) => {

        return (
          <Button
            onClick={() => { clickHandler(v) }}
            variant="text"
            startIcon={<VisibilityIcon style={{ color: "white" }}
            />}
          ></Button >
        )
      }
    }
  ]
  return (

    <Box m="20px">
      <Header title="Công nợ" subtitle="Danh sách công nợ" />
      <Box>
        <Typography width="50%" display="inline-block" variant="h2" fontWeight="bold" color={colors.greenAccent[400]} textAlign="center">
          Công nợ chưa thu
        </Typography>
        <Typography width="50%" display="inline-block" variant="h2" fontWeight="bold" color={colors.greenAccent[400]} textAlign="center">
          Công nợ đã thu
        </Typography>
        <Box
          display="inline-block"
          m="0 10px 0 0"
          height="60vh"
          width="calc(50% - 10px)"
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
          }}>
          <DataGrid
            rows={mockDataReceivable.map((v) => { return { ...v, stt: ++countRow } })}
            columns={columns}
          />
        </Box>
        <Box
          m="0 0 0 10px"
          display="inline-block"
          height="60vh"
          width="calc(50% - 10px)"
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
          }}>
          <DataGrid
            rows={mockDataCollected.map((v) => { return { ...v, stt: ++countRow1 } })}
            columns={columns1}
          />
        </Box>
      </Box>
      <BootstrapDialog
        onClose={closeHandler}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ overflow: 'auto' }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={closeHandler}
        >
          <h1 style={{ color: colors.greenAccent[300], textAlign: "center", margin: 0 }}>Chi tiết công nợ</h1>
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ bgcolor: colors.primary[400] }}>

          {(ct => {
            console.log(ct);
            return (
              <Typography>
                <OrderInfoTable
                  id={ct.id}
                  customer={{ name: "Son", phone: "123", address: { ward: "123", district: "123", province: "123", detail: "Ha Noi" } }}
                  shippingFree={ct.shippingFree}
                  price={ct.price}
                  orderTime={ct.orderTime}
                  payTime={ct.payTime}
                />
              </Typography>
            )
          })(content)}
        </DialogContent>
      </BootstrapDialog>
    </Box >
  )
}
export interface OrderInfo {
  id: string;
  customer: { name: string, phone: string, address: { ward: string, district: string, province: string, detail: string } };
  shippingFree: number;
  price: number;
  orderTime: string;
  payTime: string;
}
export const OrderInfoTable = ({ id, customer, shippingFree, price, orderTime, payTime }: OrderInfo) => {
  const css = `.tb,.tb tr, .tb td, .tb th{
  border: 1.5px solid #515151; 
  border-collapse: collapse; 
  padding: .7em;
  // white-space: nowrap;
  }
  `
  return (
    <table className="tb"
    >
      <style>{css}</style>
      <tr>
        <th>ID</th>
        <th>Thông tin khách hàng</th>
        <th>Phí ship</th>
        <th>Tổng tiền</th>
        <th>Thời gian tạo đơn</th>
        <th>Thời gian hoàn thành</th>
      </tr>
      <tr>
        <td>{id}</td>
        {((cus) => {
          return (
            <td>
              <tr>
                <th>Tên</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
              </tr>
              <tr>
                <td>{cus.name}</td>
                <td>{cus.phone}</td>
                <td>{cus.address.detail}</td>
              </tr>
            </td>
          )
        })(customer)}
        <td>{shippingFree}</td>
        <td>{price}</td>
        <td>{orderTime}</td>
        <td>{payTime}</td>
      </tr>
    </table>
  )
}
export default CongNo