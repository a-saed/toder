import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TodayIcon from "@mui/icons-material/Today";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Link } from "react-router-dom";

type SideNavProps = {
  open: boolean;
};

export const SideNav = ({ open: _open }: SideNavProps) => {
  return (
    <div>
      <List>
        <Link to="/" style={{ textDecoration: "none", color: "#CCC" }}>
          <ListItemButton onClick={() => {}}>
            <ListItemIcon>
              <TodayIcon sx={{ color: "#2C8042" }} />
            </ListItemIcon>
            <ListItemText primary="Today" />
          </ListItemButton>
        </Link>

        <Link to="upcoming" style={{ textDecoration: "none", color: "#CCC" }}>
          <ListItemButton onClick={() => {}}>
            <ListItemIcon>
              <EventAvailableIcon sx={{ color: "#CCC" }} />
            </ListItemIcon>
            <ListItemText primary="Upcoming" />
          </ListItemButton>
        </Link>
      </List>
    </div>
  );
};
