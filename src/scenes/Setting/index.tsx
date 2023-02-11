import TableChartIcon from "@mui/icons-material/TableChart";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import { ListSubheader } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

/**
 * Setting page
 */
function Setting(props: Props) {
  // NOTE: DO NOT USE usePreserveQueryNavigate HERE!
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const [checked, setChecked] = React.useState<string[]>(() => {
    const initializeChecked = ["topbar", "sidebar"];
    search
      .replace("?", "")
      .split("&")
      .forEach((exp) => {
        const [k, v] = exp.split("=");
        if ((k === "topbar" || k === "sidebar") && v === "false") {
          initializeChecked.splice(
            initializeChecked.findIndex((ik) => ik === k),
            1
          );
        }
      });
    return initializeChecked;
  });

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
    const pathWithoutQuery = pathname.split("?")[0];
    console.log(pathWithoutQuery);
    const path = `${pathWithoutQuery}?sidebar=${
      checked.indexOf("sidebar") !== -1
    }&topbar=${checked.indexOf("topbar") !== -1}`;
    navigate(path);
  }, []);

  return (
    <List
      sx={{ width: "100%", maxWidth: 1080, margin: "auto", minWidth: 320 }}
      subheader={<ListSubheader>Cài đặt</ListSubheader>}
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
