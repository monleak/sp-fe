import {
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import Setting from "../Setting";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [searchParams, setParams] = useSearchParams();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // if (searchParams.get("topbar") === "false") {
  //   return null;
  // }

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        {searchParams.get("topbar") === "false" ? null : (
          <>
            {/* SEARCH BAR */}
            <Box
              display="flex"
              bgcolor={colors.primary[400]}
              borderRadius="3px"
            >
              <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>
              <IconButton>
                <NotificationsOutlinedIcon />
              </IconButton>
              <IconButton onClick={handleClick}>
                <SettingsOutlinedIcon />
              </IconButton>
              <IconButton>
                <PersonOutlinedIcon />
              </IconButton>
            </Box>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Setting />
              {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
            </Popover>
          </>
        )}
      </Box>
    </>
  );
};

export default Topbar;
