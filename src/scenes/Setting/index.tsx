import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TableChartIcon from "@mui/icons-material/TableChart";
import Switch from "@mui/material/Switch";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

function Setting({}: Props) {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const [checked, setChecked] = React.useState(["sidebar"]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  React.useEffect(() => {
    navigate(
      `${pathname}?sidebar=${checked.indexOf("sidebar") !== -1}&topbar=${
        checked.indexOf("topbar") !== -1
      }`
    );
  }, [checked, navigate, pathname]);

  return (
    <List
      sx={{ width: "100%", maxWidth: 1080, margin: "auto" }}
      subheader={
        <Typography variant="h2" padding={4}>
          Cài đặt
        </Typography>
      }
    >
      <ListItem>
        <ListItemIcon>
          <ViewSidebarIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-sidebar" primary="Sidebar" />
        <Switch
          edge="end"
          onChange={handleToggle("sidebar")}
          checked={checked.indexOf("sidebar") !== -1}
          inputProps={{
            "aria-labelledby": "switch-list-label-sidebar",
          }}
          color={"secondary"}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <TableChartIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-topbar" primary="Topbar" />
        <Switch
          edge="end"
          onChange={handleToggle("topbar")}
          checked={checked.indexOf("topbar") !== -1}
          inputProps={{
            "aria-labelledby": "switch-list-label-topbar",
          }}
          color={"secondary"}
        />
      </ListItem>
    </List>
  );
}

export default Setting;
