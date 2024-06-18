import React, { useState, useEffect } from "react";
import { Checkbox, Typography } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteIcon from "@mui/icons-material/Delete";

import SubTaskEditForm from "./SubTaskEditForm";
import styles from "@/styles/TaskDetails.module.css";
import { updateTask } from "@/services/db.service";

interface SingleSubTaskProps {
  subTask: SubTask;
  parentTask: Task;
  isCompleted: boolean;
}

const SingleSubTask = ({
  subTask,
  parentTask,
  isCompleted,
}: SingleSubTaskProps) => {
  const [editMode, setEditMode] = useState(false);
  const [showSubTaskControls, setShowSubTaskControls] = useState(false);

  const handleCancel = () => {
    setEditMode(false);
  };

  const deleteSubTask = async (subTaskId: string) => {
    if (window.confirm(`are you sure ?`)) {
      parentTask.subTasks = parentTask.subTasks.filter(
        (subT) => subT._id !== subTaskId
      );

      const { ok } = await updateTask(parentTask);
      if (ok) {
        console.info(`${subTaskId} subtask deleted successfully!!`);
      }
    }
  };

  const handleCompleteSubTask = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    parentTask.subTasks.map((subT) => {
      if (subTask._id === subT._id) {
        subT.completed = e.target.checked;
      }
      return subT;
    });

    const { ok } = await updateTask(parentTask);
    if (ok) {
      console.info("subtask updated succefully");
      handleCancel();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && editMode) {
        handleCancel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editMode]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          marginTop: "15px",
        }}
      >
        <Checkbox
          size="small"
          title="mark as completed"
          aria-label="check-completed"
          color="success"
          sx={{ mr: 1 }}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
          checked={subTask.completed}
          disabled={editMode}
          onChange={handleCompleteSubTask}
        />
        {editMode ? (
          <SubTaskEditForm
            subtask={subTask}
            handleCancel={handleCancel}
            parentTask={parentTask}
          />
        ) : (
          <div
            style={{
              border: "1px solid #222",
              borderRadius: 10,
              padding: 10,
              backgroundColor: "#1E1E1E",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              cursor: "text",
            }}
            onMouseEnter={() => setShowSubTaskControls(true)}
            onMouseLeave={() => setShowSubTaskControls(false)}
          >
            <div style={{ width: "100%" }}>
              <Typography
                className={`${isCompleted ? styles.completed : null}`}
                onClick={() => setEditMode(true)}
                variant="body1"
              >
                {subTask.name}
              </Typography>
              <Typography
                className={`${isCompleted ? styles.completed : null}`}
                onClick={() => setEditMode(true)}
                variant="caption"
                color="text.secondary"
              >
                {subTask.description}
              </Typography>
            </div>
            {showSubTaskControls ? (
              <div>
                <span role="button" onClick={() => deleteSubTask(subTask._id)}>
                  <DeleteIcon
                    sx={{
                      cursor: "pointer",
                      fontSize: "1.3rem",
                      color: "#999",
                      "&:hover": { color: "#CCC" },
                    }}
                  />
                </span>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleSubTask;
