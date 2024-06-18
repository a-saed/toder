import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import FlagIcon from "@mui/icons-material/Flag";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { proiorities } from "@/data/constants";

interface PrioritySelectorProps {
  selectedPriority: PriorityItem;
  setSelectedPriority: (item: PriorityItem) => void;
  view: "create" | "details";
  canEdit?: boolean;
}

export const PrioritySelector = ({
  selectedPriority,
  setSelectedPriority,
  view,
  canEdit = true,
}: PrioritySelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (newVal: PriorityItem) => {
    handleClose();
    setSelectedPriority(newVal);
  };

  return (
    <div style={{ margin: 3 }}>
      <Button
        title="set priority"
        id="priority-menu-button"
        aria-controls={open ? "priority-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={canEdit ? handleClick : () => {}}
        color="greeyBtn"
        sx={{
          textTransform: "none",
          "& .MuiSvgIcon-root": {
            fontSize: "15px",
          },
          color: selectedPriority.color,
        }}
        variant={view === "create" ? "outlined" : "text"}
        size="small"
        startIcon={<FlagIcon />}
      >
        {selectedPriority.value}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiMenu-paper": {
            p: 0,
            bgcolor: "#0D0D0D",
          },
        }}
      >
        <div>
          {proiorities.map((p, i) => (
            <MenuItem
              autoFocus={i === 0 ? true : false}
              onClick={() => handleOptionClick(p)}
              key={i}
            >
              <ListItemIcon>
                <FlagIcon fontSize="small" sx={{ color: p.color }} />
              </ListItemIcon>
              <ListItemText
                primary={p.label}
                primaryTypographyProps={{ fontSize: "15px" }}
              />
            </MenuItem>
          ))}
        </div>
      </Menu>
    </div>
  );
};
