import { Box, Button, Dialog, DialogProps, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Header from "../../components/Header";
import * as React from "react";
import ChiTietDonHang from "./ChiTietDonHang";
import { Order, Product, Receiver } from './type';

const XemDonHang = ({ orders }: { orders: Order[] }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [products, setProducts] = React.useState<Product[]>([]);
    const [receiver, setReceiver] = React.useState<Receiver>({});
    const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");

    const handleClickOpen = function handleClickOpen({ products, receiver }: { products: Product[]; receiver: Receiver; }) {
        setOpen(true);
        setProducts(products);
        setReceiver(receiver);
    };

    const handleClose = function handleClose() {
        setOpen(false);
    };
    const columns = [
        { field: "orderId", headerName: "ID Hóa đơn", flex: .5 },
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
            headerName: "Xem thêm",
            flex: .5,
            renderCell: function f(data: any) {
                return (
                    <Button
                        onClick={() => {
                            handleClickOpen({ products: data.row.products, receiver: data.row.receiver });
                        }}
                        variant="text"
                        startIcon={<RemoveRedEyeIcon style={{ color: "white" }} />}
                    ></Button>
                );
            },
        },
    ];
    return (
        <>
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
                    getRowId={(row) => row.orderId || 0}
                    rows={orders}
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
        </>
    );
};

export default XemDonHang;
