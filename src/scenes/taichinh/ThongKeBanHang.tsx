import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { color } from "@mui/system";
import React, { Fragment } from 'react';
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from '../../components/LineChart';
import StatBox from '../../components/StatBoxV2';
import { tokens } from "../../theme";
import DoanhThu from './thongke/DoanhThu';
import SanPham from "./thongke/SanPham";
import { mockDataInvoices, mockDataTeam } from "../../data/mockData";
const ThongKeBanHang = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (

    <Box>
     <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Thống Kê Bán hàng" subtitle="" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
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
          <StatBox
            price="30.100.000 đ"
            title="Doanh Thu"
            progress="0.65"
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
          <StatBox
            price="80.000 đ"
            title="Tổng Vốn"
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
          <StatBox
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
          <StatBox
            price="450.000 đ"
            title="So với cùng kì tháng trước"
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
                Tổng Quan
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
            <LineChart />
          </Box>
        </Box>

        {/* ROW 3 */}
        {/* Ncc */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            color={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Danh sách nhà cung cấp
            </Typography>
          </Box>
          {mockDataTeam.map((supplier: any, i: any) => (
            <Box
              key={`${supplier.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {supplier.id}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {supplier.name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]} justifyItems="left">
                {supplier.email}
              </Box>
              <Box color={colors.grey[100]}>{supplier.count}</Box>
            </Box>
          ))}
        </Box>
        {/* sp */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            color={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Danh sách sản phẩm
            </Typography>
          </Box>
          {mockDataInvoices.map((product, i) => (
            <Box
              key={`${product.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {product.id}
                </Typography>
                <Typography color={colors.grey[100]}>{product.name}</Typography>
              </Box>
              <Box color={colors.grey[100]} justifyItems="left">
                {product.cost}
              </Box>
              <Box color={colors.grey[100]}>{product.count}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
      <Fragment>
        <DoanhThu />
      </Fragment>
    </Box>


  )
}

export default ThongKeBanHang