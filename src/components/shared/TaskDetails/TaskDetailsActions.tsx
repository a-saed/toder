import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import { deleteTask } from "@/services/db.service";
import EditIcon from "@mui/icons-material/Edit";

interface TaskDetailsActionsProps {
  task: Task;
}

const TaskDetailsActions = ({ task }: TaskDetailsActionsProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTask = async () => {
    if (window.confirm(`are u sure to delete this task!`)) {
      const { ok } = await deleteTask(task._id);
      if (ok) {
        console.log("deleted!!");314
        handleClose();
      }
    }
  };

  return (
    <div>
      <span style={{ cursor: "pointer" }} onClick={handleClick}>
        <MoreVertIcon
          sx={{
            fontSize: "1.3rem",
            color: "#999",
            "&:hover": { color: "#CCC" },
          }}
        />
      </span>
      <Menu
        PaperProps={{ sx: { minWidth: 150 } }}
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ArchiveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Archive</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteTask}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TaskDetailsActions;
