import React from 'react'
import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { mockDataDetailsExport } from '../../data/mockData';
import { DataGrid } from '@mui/x-data-grid';
import { Order } from './type';
const ChiTietDonHang = ({ products, receiver }: Order) => {
    console.log(products);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "productId", headerName: "ID Sản phẩm" },
        { field: "productName", headerName: "Tên Sản phẩm", flex: 1 },
        { field: "quantity", headerName: "Số lượng", flex: 1 },
        { field: "size", headerName: "Size", flex: 1 },
        { field: "color", headerName: "Màu sắc", flex: 1 },
        { field: "productStatus", headerName: "Trạng thái", flex: 1 },
        {
            field: "img", headerName: "Ảnh", flex: 1,
            renderCell: function f(data: any) {
                return (
                    <>
                        <img src={data?.row?.img} title={data?.row?.productName} alt="img" style={{ height: "50px", width: "75px" }} />
                    </>);
            }
        },
        {
            field: "price", headerName: "Giá", flex: 1,
            renderCell: ({ row: { price } }: any) => {
                let p = Number.parseInt(price);
                return (
                    <>
                        {p.toLocaleString()} VNĐ
                    </>
                )
            }
        },
    ];
    return (
        <Box>
            <Header
                title="Chi tiết đơn hàng"
                subtitle=""
            />
            <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                marginBottom="20px"
            >
                <details style={{ marginLeft: "10px" }}>
                    <summary>Thông tin người nhận</summary>
                    <p style={{ paddingLeft: ".5em" }}>id: {receiver?.userId}</p>
                    <address style={{ paddingLeft: ".5em" }}>
                        {receiver?.address?.detail}
                    </address>
                </details>
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
                    getRowId={(row) => {
                        return row.productId || 0
                    }}
                    rows={products || []}
                    columns={columns}
                />
            </Box>
        </Box>

    )
}

export default ChiTietDonHang