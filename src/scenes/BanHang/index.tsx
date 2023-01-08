import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import * as React from 'react';
import ChoXacNhan from "./ChoXacNhan";
import DaXacNhan from "./DaXacNhan";
import DangGiao from "./DangGiao";

const BanHang = () => {
    const [isToggled, setIsToggled] = React.useState(true);
    const [isToggled1, setIsToggled1] = React.useState(false);
    const [isToggled2, setIsToggled2] = React.useState(false);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Quản Lý Bán Hàng" subtitle="" />
            </Box>
            <Box display="flex" justifyContent="left" alignItems="center">
                <Button
                    onClick={() => {
                        setIsToggled1(false);
                        setIsToggled2(false);
                        setIsToggled(true);
                    }}
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        margin: "0 10px",
                        width: "150px"
                    }}

                >
                    Chờ Xác Nhận
                </Button>
                <Button
                    onClick={() => {
                        setIsToggled(false);
                        setIsToggled2(false);
                        setIsToggled1(true);
                    }} 
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        margin: "0 10px",
                        width: "150px"

                    }}
                >
                    Đã Xác Nhận
                </Button>
                <Button
                    onClick={() => {
                        setIsToggled1(false);
                        setIsToggled(false);
                        setIsToggled2(true);

                    }} 
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        margin: "0 10px",
                        width: "150px"

                    }}
                >
                    Đang Giao
                </Button>
            </Box>
            <Box marginBottom="20px">
                {isToggled1 && <DaXacNhan />}
                {isToggled && <ChoXacNhan />}
                {isToggled2 && <DangGiao/>}
            </Box>
        </Box>
    );
};

export default BanHang;
