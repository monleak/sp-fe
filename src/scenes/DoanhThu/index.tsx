import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBoxV2 from "../../components/StatBoxV2";
import { mockDataTeam, mockDataThongKe } from "../../data/mockData";
import { mockDataInvoices } from "../../data/mockData";
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Autocomplete from '@mui/material/Autocomplete';
import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';

const DoanhThu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));
  const options = ["Doanh thu","Sản phẩm"];
  return (
    <Box m="5px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Thống Kê Doanh Thu" subtitle="" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "10px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* <Box display="flex" justifyContent="space-between" alignItems="center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <DesktopDatePicker
            label="Thống Kê Tới Ngày"
            value={value}
            minDate={dayjs('2017-01-01')}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Tim Kiếm
        </Button>
      </Box> */}


      <Box display="flex" justifyContent="space-between" alignItems="center">
        loại thống kê
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Doanh thu" />}
        />
        thời gian:
        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <DesktopDatePicker
            label="Thống Kê Tới Ngày"
            value={value}
            minDate={dayjs('2017-01-01')}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>

      <Box marginBottom="20px">
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBoxV2
            price="30.100.000 đ"
            title="Doanh thu"
            progress="0.75"
            increase="+14%"
            icon={
              <LooksOneIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBoxV2
            price="80.000 đ"
            title="Tổng vốn"
            progress="0.50"
            increase="+21%"
            icon={
              <LooksTwoIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBoxV2
            price="500.000 đ"
            title="Lợi Nhuận"
            progress="0.30"
            increase="+5%"
            icon={
              <Looks3Icon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBoxV2
            price="450.000 đ"
            title="So Với cùng kì tháng trước"
            progress="0.80"
            increase="+43%"
            icon={
              <Looks4Icon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Tổng Doanh Thu
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        {/* ROW 3 */}
        {/* Ncc */}
        <Box
          gridColumn='span 12'
          gridRow='span 2'
          bgcolor={colors.primary[400]}
          overflow='auto'
        >
          {mockDataThongKe.map((supplier: any, i: any) => (
            <Box
              key={`${supplier.thang}-${i}`}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              borderBottom={`4px solid ${colors.primary[500]}`}
              p='15px'
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant='h5'
                  fontWeight='600'
                >
                  {supplier.thang}
                </Typography>
              </Box>

              <Box color={colors.grey[100]} width = "120px">
                {supplier.donhang}

              </Box>

              <Box color={colors.grey[100]} width = "100px">
                {supplier.doanhthu}
              </Box>
              <Box color={colors.grey[100]} width = "70px">
                {supplier.giamgia}
              </Box> 
              <Box color={colors.grey[100]} width = "80px">
                {supplier.trahang}
              </Box> 
              <Box color={colors.grey[100]} width = "100px">
                {supplier.doanhthuthuc}
              </Box> 
              <Box color={colors.grey[100]} width = "70px">
                {supplier.vanchuyen}
              </Box>    
              <Box color={colors.grey[100]} width = "100px">
                {supplier.tongdoanhthu}
              </Box>         
                    
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DoanhThu;
