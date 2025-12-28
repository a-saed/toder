import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import styles from "@/styles/TaskDetails.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { updateTask } from "@/services/db.service";
import useCloseOnEscape from "@/hooks/useCloseOnEscape";
import { handleKeyDown } from "@/utils/forms.utils";
import TaskDetailsActions from "./TaskDetailsActions";

const TaskDetailsMainContent = ({ task }: { task: Task }) => {
  const [currTaskName, setCurrTaskName] = useState(task.name);
  const [currTaskDesc, setCurrTaskDesc] = useState(task.description);
  const [editMode, setEditMode] = useState(false);

  const handleCancel = () => {
    setCurrTaskName(task.name);
    setCurrTaskDesc(task.description);
    setEditMode(false);
  };
  useCloseOnEscape(editMode, handleCancel);

  const editTask = async () => {
    task.name = currTaskName;
    task.description = currTaskDesc;
    const { ok } = await updateTask(task);
    if (ok) {
      console.info("updated succefully");
      handleCancel();
    }
  };

  const handleCompleteChechboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    task.completed = e.target.checked;
    const { ok } = await updateTask(task);
    if (ok) {
      console.info("updated succefully");
      handleCancel();
      // if (task._id === selectedTask?._id && task.completed)
      //   setSelectedTask(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Checkbox
        size="small"
        title="mark as completed"
        aria-label="check-completed"
        color="success"
        sx={{ mr: 1 }}
        checked={task.completed}
        disabled={editMode}
        onChange={handleCompleteChechboxChange}
      />
      {editMode ? (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { width: "100%" },
            width: "100%",
            border: "1px solid #2D2D2D",
            borderRadius: 2,
            p: 1,
          }}
          noValidate
          autoComplete="off"
          onKeyDown={(e) =>
            handleKeyDown(e, () => {
              if (!currTaskName.trim()) return;
              editTask();
            })
          }
        >
          <TextField
            id="task-name"
            size="small"
            placeholder="Task name"
            fullWidth
            variant="standard"
            multiline
            value={currTaskName}
            onChange={(e) => setCurrTaskName(e.target.value)}
            autoFocus
            InputProps={{
              disableUnderline: true,
            }}
            inputProps={{
              className: styles.taskTitle,
            }}
          />
          <TextField
            id="task-description"
            size="small"
            placeholder="Description"
            variant="standard"
            multiline
            InputProps={{ disableUnderline: true }}
            inputProps={{
              className: styles.taskDesc,
            }}
            onChange={(e) => setCurrTaskDesc(e.target.value)}
            value={currTaskDesc}
          />
          <Stack
            sx={{
              justifyContent: "flex-end",
              "& > :not(style)": { p: 0 },
            }}
            spacing={1.2}
            direction="row"
          >
            <Button
              size="small"
              variant="text"
              color="warning"
              sx={{ textTransform: "none" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              color="reddy"
              sx={{ textTransform: "none" }}
              disabled={
                !currTaskName.trim() ||
                (currTaskName === task.name &&
                  currTaskDesc === task.description)
              }
              onClick={editTask}
            >
              Save
            </Button>
          </Stack>
        </Box>
      ) : (
        <div
          style={{
            padding: 12,
            cursor: "text",
            width: "100%",
          }}
          onClick={() => (task.completed ? null : setEditMode(true))}
        >
          <Typography
            variant="body1"
            className={`${styles.taskTitle} ${
              task.completed ? styles.completed : null
            }`}
          >
            {task.name}
          </Typography>
          <Typography
            variant="body2"
            className={`${styles.taskDesc} ${
              task.completed ? styles.completed : null
            }`}
          >
            {task.description}
          </Typography>
        </div>
      )}
      <TaskDetailsActions task={task} enableEdit={() => setEditMode(true)} />
    </div>
  );
};

export default TaskDetailsMainContent;
