import { MouseEvent, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { deleteTask, updateTask } from "@/services/db.service";
import EditIcon from "@mui/icons-material/Edit";
import { useAppStore } from "@/store/app.store";
import { POMODORO_TOTAL_SESSIONS } from "@/data/constants";
import { generateUniqueId } from "@/utils/general.util";
import { toast } from "react-toastify";

interface TaskDetailsActionsProps {
  task: Task;
  enableEdit: () => void;
}

const TaskDetailsActions = ({ task, enableEdit }: TaskDetailsActionsProps) => {
  const {
    toggleBottomDrawer,
    currPomodoro: {
      isActive: isActivePomodoro,
      taskId: pomoTaskId,
      ongoingSession,
    },
    toggleCurrPomodoro,
    setCurrPomodoro,
  } = useAppStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTask = async () => {
    if (window.confirm(`are u sure to delete this task!`)) {
      const { ok } = await deleteTask(task._id);
      if (ok) {
        console.log("deleted!!");
        handleClose();
      }
    }
  };

  const handleClickPomodoro = () => {
    if (!!pomoTaskId && pomoTaskId !== task._id) {
      if (ongoingSession) {
        toast("there's already ongoing pomodoro session!!", {
          type: "warning",
        });
      }
    }
    console.log({ pomos: task.pomodoros, isActivePomodoro });
    if (!ongoingSession) {
      //  create new pomodoro
      const newPomo: Pomodoro = {
        id: generateUniqueId(),
        taskId: task._id,
        isActive: true,
        ongoingSession: true,
        totalSessions: POMODORO_TOTAL_SESSIONS,
        doneSessions: 0,
      };
      setCurrPomodoro(newPomo);
      task.pomodoros = [...(task?.pomodoros || []), newPomo];
      updateTask(task);
      toast("New pomodoro session has been started", { type: "success" });
    } else {
      if (isActivePomodoro) {
        toggleCurrPomodoro(false);
      } else {
        toggleCurrPomodoro(true);
      }
    }

    toggleBottomDrawer(true);
    handleClose();
  };

  const formatPomodoroActionText = () => {
    console.log({
      lngth: task.pomodoros?.length,
      id: task._id,
      pomoTaskId,
      ongoingSession,
      isActivePomodoro,
    });

    if (task._id !== pomoTaskId) return "Start Pomodoro";
    return `${
      !ongoingSession ? "Start" : isActivePomodoro ? "Stop" : "Resume"
    } Pomodoro`;
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
          dense: true,
          "aria-labelledby": "long-button",
          sx: { bgcolor: "#222" },
        }}
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickPomodoro}>
          <ListItemIcon>
            <AvTimerIcon
              fontSize="small"
              color={`${
                task._id !== pomoTaskId
                  ? "success"
                  : isActivePomodoro
                  ? "error"
                  : "success"
              }`}
            />
          </ListItemIcon>
          <ListItemText>{formatPomodoroActionText()}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            enableEdit();
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" color="info" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteTask}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="action" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TaskDetailsActions;
