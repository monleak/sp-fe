import { Box, Button, IconButton, Typography, useTheme, TextField, Alert, AlertTitle } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import * as React from 'react';
import ChoXacNhan from "./ChoXacNhan";
import XemDonHang from "./XemDonHang";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import dayjs, { Dayjs } from "dayjs";
import { API_SP05_URL } from "../../utils/config";
const BanHang = () => {
    const [isToggled, setIsToggled] = React.useState(true);
    const [isToggled1, setIsToggled1] = React.useState(false);
    const [isToggled2, setIsToggled2] = React.useState(false);
    const [isToggled3, setIsToggled3] = React.useState(false);
    const [isToggled4, setIsToggled4] = React.useState(false);
    const [startValue, setStartValue] = React.useState<Dayjs | null>(
        dayjs("2022-04-07")
    );
    const [order, setOrder] = React.useState<any[]>([]);
    const [isTypeMonth, setIsTypeMonth] = React.useState(true);
    const [isFilter, setIsFilter] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [styleShow, setStyleShow] = React.useState(true);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    React.useEffect(() => {
        let status = isToggled && "PENDING" || isToggled1 && "ACCEPT" || isToggled2 && "DELIVERING" || isToggled3 && "DELIVERED" || isToggled4 && "SUCCESS";
        let url = API_SP05_URL + "order?status=" + status;
        if (isFilter) {
            url += "&type=" + (isTypeMonth ? "month" : "year") + "&month=" + ((startValue?.month() || 0) + 1) + "&year=" + startValue?.year();
        }
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setOrder(data.data.orders);
                setStyleShow(true)
                console.log(data.data.orders);
            }
            ).catch((error) => {
                setStyleShow(false)
            }).finally(() => {
                setShow(true);
                setTimeout(() => { setShow(false); }, 1000);
            });
    }, [isToggled, isToggled1, isToggled2, isToggled3, isToggled4, isFilter, isFilter && isTypeMonth, isFilter && startValue]);
    const onChangeTypeSearch = () => {
        setIsTypeMonth(!isTypeMonth);
    }
    const onChangeFilter = () => {
        setIsFilter(!isFilter);
    }
    return (

        <Box mr="20px" ml="20px">
            <Stack sx={{ opacity: show ? 1 : 0, position: "fixed", top: "10px", right: show ? "10px" : "-250px", transition: "all .5s linear" }}>
                <Alert severity={!styleShow ? "error" : "success"}>
                    <AlertTitle>{!styleShow ? "エラー" : "成功"}</AlertTitle>
                    {!styleShow ? "注文情報を取得できません" : "注文インフォメーションの成功を取得します"}
                </Alert>
            </Stack>
            <Box display="flex" justifyContent="space-between">
                <Header title="Quản Lý Bán Hàng" subtitle={"Các đơn hàng " + (isToggled && "đang chờ xác nhận" || isToggled1 && "đã xác nhận" || isToggled2 && "đang giao" || isToggled3 && "đã giao" || isToggled4 && "hoàn thành") || ""} />
                <Box display="flex" justifyContent="space-between" alignItems="center" width="55%">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>
                            Month
                        </Typography>
                        <Switch color="secondary" onChange={onChangeTypeSearch} />
                        <Typography>
                            Year
                        </Typography>
                    </Stack>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            value={startValue}
                            minDate={dayjs("1900-01-01")}
                            maxDate={dayjs(Date.now())}
                            onChange={(newValue) => {
                                setStartValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox color="secondary" onChange={onChangeFilter} />} label="Lọc đơn hàng" />
                    </FormGroup>
                </Box>

            </Box>
            <Box display="flex" justifyContent="space-between">
                <Button
                    onClick={() => {
                        setIsToggled4(false);
                        setIsToggled3(false);
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
                        setIsToggled4(false);
                        setIsToggled3(false);
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
                        setIsToggled4(false);
                        setIsToggled3(false);
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
                <Button
                    onClick={() => {
                        setIsToggled4(false);
                        setIsToggled2(false);
                        setIsToggled1(false);
                        setIsToggled(false);
                        setIsToggled3(true);

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
                    Đã Giao
                </Button>
                <Button
                    onClick={() => {
                        setIsToggled3(false);
                        setIsToggled2(false);
                        setIsToggled1(false);
                        setIsToggled(false);
                        setIsToggled4(true);

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
                    Hoàn Thành
                </Button>
            </Box>
            <Box mt="0">
                {isToggled && <ChoXacNhan /> || <XemDonHang
                    orders={order}
                />}
            </Box>
        </Box >
    );
};

export default BanHang;
