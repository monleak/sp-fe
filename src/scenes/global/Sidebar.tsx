import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useRoutes } from "react-router-dom";
import { LinkWithPreserveQuery } from "../../components/common/LinkWithPreserveQuery";

type ItemProps = {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected?: string;
  setSelected?: any;
};

type SidebarTextItemProps = {
  type: "text" | "item";
  title: string;
};

type SidebarItemListProps =
  | (
      | ({
          type: "text";
        } & SidebarTextItemProps)
      | ({ type: "item" } & ItemProps)
    )[];

/**
 * NOTE: ADD NEW SIDEBAR SESSION HERE !!!
 */
const sidebarSessions: SidebarItemListProps = [
  { type: "item", to: "/", title: "Dashboard", icon: <HomeOutlinedIcon /> },
  { type: "text", title: "Nhập hàng" },
  {
    type: "item",
    to: "/imports/create",
    title: "Tạo yêu cầu nhập hàng",
    icon: <ContactsOutlinedIcon />,
  },
  {
    type: "item",
    to: "/imports/history",
    title: "Lịch sử nhập hàng",
    icon: <ReceiptOutlinedIcon />,
  },
  {
    type: "item",
    to: "/imports/request",
    title: "Yêu cầu nhập hàng",
    icon: <ReceiptOutlinedIcon />,
  },
  { type: "text", title: "Nhà cung cấp" },
  {
    type: "item",
    icon: <PersonOutlinedIcon />,
    to: "/suppliers",
    title: "Danh sách NCC",
  },
  {
    type: "item",
    icon: <PersonOutlinedIcon />,
    to: "/suppliers/create",
    title: "Tạo NCC (test)",
  },
  {
    type: "item",
    icon: <PersonOutlinedIcon />,
    to: "/suppliers/1",
    title: "Chi tiết 1 NCC (test)",
  },
  { type: "text", title: "Báo giá" },
  {
    type: "item",
    to: "/imports/1/price-quotation-list/",
    title: "Danh sách báo giá",
    icon: <HomeOutlinedIcon />,
  },
  { type: "text", title: "Cài đặt" },
  {
    type: "item",
    to: "/setting",
    title: "Cài đặt",
    icon: <SettingsIcon />,
  },
];

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <LinkWithPreserveQuery to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const [searchParams, setParams] = useSearchParams();
  if (searchParams.get("sidebar") === "false") {
    return null;
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: isCollapsed
            ? "5px 35px 5px 18px !important"
            : "5px 35px 5px 10px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  // src={`../../assets/user.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                /> */}
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Sp17
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Quản lý nhập, xuất, bán hàng
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* MAP SESSION LIST */}
            {sidebarSessions.map((item) => {
              switch (item.type) {
                case "text":
                  if (isCollapsed) {
                    return <Divider />;
                  } else {
                    return (
                      <Typography
                        variant="h6"
                        color={colors.grey[300]}
                        sx={{ m: "15px 0 5px 20px" }}
                      >
                        {item.title}
                      </Typography>
                    );
                  }
                case "item":
                  return (
                    <Item
                      title={item.title}
                      to={item.to}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  );
              }
            })}
            {/* MAP SESSION LIST */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
