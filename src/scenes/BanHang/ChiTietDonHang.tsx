import React from 'react'
import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { mockDataDetailsExport } from '../../data/mockData';
import { DataGrid } from '@mui/x-data-grid';

const ChiTietDonHang = () => {
    const date = new Date("12/12/2022");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "id", headerName: "ID" },
        { field: "supplier_id", headerName: "Id nhà cung cấp", flex: 0.5 },
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
                // color={colors.grey[100]}
                marginBottom="20px"
            >
                Ngày Tạo Đơn : {date.toLocaleDateString('en-GB')}
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
                    rows={mockDataDetailsExport}
                    columns={columns}
                />
            </Box>
        </Box>

    )
}

export default ChiTietDonHang