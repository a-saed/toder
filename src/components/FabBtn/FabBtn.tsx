import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";

const actions = [
  { icon: <AssignmentIcon />, name: "Task" },
  { icon: <DashboardIcon />, name: "Project" },
];

export const FabBtn = React.memo(() => {
  return (
    <SpeedDial
      ariaLabel="FabBtn"
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        "& .MuiSpeedDial-fab": { width: "3rem", height: "3rem" },
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
        />
      ))}
    </SpeedDial>
  );
});
