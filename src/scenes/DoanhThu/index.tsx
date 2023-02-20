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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import MySelect, { Target, MySelectProps } from './Select';
import Autocomplete from '@mui/material/Autocomplete';
import { StatisticsData, StatisticsQuery, StatisticsPerMonth } from "./type";
import { API_SP05_URL } from "../../utils/config";
const DoanhThu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date));
  const [data, setData] = React.useState<StatisticsData>();
  const [query, setQuery] = React.useState<StatisticsQuery>({ type: "month", month: (new Date).getMonth(), year: (new Date).getFullYear() });
  const [statisticsPerMonth, setStatisticsPerMonth] = React.useState<StatisticsPerMonth[]>();
  React.useEffect(() => {
    let url = `${API_SP05_URL}statistics?type=${query.type}&month=${(query.month || 0) + 1}&year=${query.year}`;
    fetch(url)
      .then((response) => response.json())
      .then(({ data: { statistics } }: { data: { statistics: StatisticsData } }) => {
        setData(statistics);
        console.log(statistics, query);
      })
    let url1 = `${API_SP05_URL}statistics/year?type=year&year=${query.year}`;
    fetch(url1)
      .then((response) => response.json())
      .then(({ data: { statistics } }: { data: { statistics: StatisticsPerMonth[] } }) => {
        setStatisticsPerMonth(statistics);
        console.log(statistics);
      })
  }, [query]);
  return (
    <Box m="10px" sx={{
      "&::-webkit-scrollbar": { width: 0 },
      overflow: "auto", height: "88%"
    }}>
      <Header title="Thống Kê Doanh Thu" subtitle="" />
      <Box display="flex" justifyContent="flex-start" alignItems="center" gap={3} flexWrap="wrap">
        <MySelect
          title="Loại thống kê"
          onChange={(value) => {
            console.log(value);
          }}
          event={[{ value: "Doanh thu", name: "Doanh thu" }, { value: "Sản phẩm", name: "Sản phẩm" }]}
        />
        <MySelect
          title="Thống kê theo"
          onChange={(value) => {
            query.type = value;
            setQuery({ ...query });
          }}
          event={[{ value: "month", name: "Tháng" }, { value: "year", name: "Năm" }]}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} maxWidth="100%">
          <DesktopDatePicker
            label="Chọn thời gian"
            value={value}
            minDate={dayjs('1900-01-01')}
            onChange={(newValue) => {
              setValue(newValue);
              setQuery({ ...query, month: newValue?.month(), year: newValue?.year() });
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
        gap={2}
      >

        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
        >
          <StatBoxV2
            price={(data?.totalPrices.toLocaleString() || 0) + " VNĐ"}
            title="Doanh thu"
            progress={(data?.growthPercentage.totalPrices || 0) / 100}
            increase={((data?.growthPercentage.totalPrices || 0) > 0 ? '+' + (data?.growthPercentage.totalPrices || 0) : data?.growthPercentage.totalPrices || 0) + "%"}
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
          borderRadius="5px"
        >
          <StatBoxV2
            price={(data?.totalCapital.toLocaleString() || 0) + " VNĐ"}
            title="Tổng vốn"
            progress={(data?.growthPercentage.totalCapital || 0) / 100}
            increase={((data?.growthPercentage.totalCapital || 0) > 0 ? '+' + (data?.growthPercentage.totalCapital || 0) : data?.growthPercentage.totalCapital || 0) + "%"}
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
          borderRadius="5px"
        >
          <StatBoxV2
            price={data?.totalRevenue.toLocaleString() + " VNĐ"}
            title="Lợi Nhuận"
            progress={(data?.growthPercentage.totalRevenue || 0) / 100}
            increase={((data?.growthPercentage.totalRevenue || 0) > 0 ? '+' + (data?.growthPercentage.totalRevenue || 0) : data?.growthPercentage.totalRevenue || 0) + "%"}
            icon={
              <Looks3Icon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn='span 12'
          gridRow='span 2'
          bgcolor={colors.primary[400]}
          overflow='auto'
        >
          <Box
            key="Tháng"
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
                Tháng
              </Typography>
            </Box>

            <Box color={colors.grey[100]} width="120px">
              Số lượng
            </Box>

            <Box color={colors.grey[100]} width="70px">
              Số đơn giảm giá
            </Box>
            <Box color={colors.grey[100]} width="80px">
              Số đơn trả
            </Box>
            <Box color={colors.grey[100]} width="70px">
              Tổng phí vận chuyển
            </Box>
            <Box color={colors.grey[100]} width="100px">
              Tổng vốn
            </Box>
            <Box color={colors.grey[100]} width="100px">
              Tổng doanh thu
            </Box>
            <Box color={colors.grey[100]} width="100px">
              Tổng lợi nhuận
            </Box>

          </Box>
          {statisticsPerMonth?.map((statistics) => (
            <Box
              key={statistics.month}
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
                  {`${statistics.month}/${query.year}`}
                </Typography>
              </Box>

              <Box color={colors.grey[100]} width="120px">
                {statistics.quantity}

              </Box>

              <Box color={colors.grey[100]} width="70px">
                {statistics.discount || 0}
              </Box>
              <Box color={colors.grey[100]} width="80px">
                {statistics.returnNum || 0}
              </Box>
              <Box color={colors.grey[100]} width="70px">
                {statistics.sippingFee || 0}
              </Box>
              <Box color={colors.grey[100]} width="100px">
                {statistics.totalCapital.toLocaleString()} VNĐ
              </Box>
              <Box color={colors.grey[100]} width="100px">
                {statistics.totalRevenue.toLocaleString()} VNĐ
              </Box>
              <Box color={colors.grey[100]} width="100px">
                {statistics.totalPrices.toLocaleString()} VNĐ
              </Box>

            </Box>
          ))}
        </Box>
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
                {// TODO: 
                }
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
            <LineChart isDashboard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DoanhThu;
