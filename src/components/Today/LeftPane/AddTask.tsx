import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styles from "@/styles/LeftPane.module.css";
import { AddTaskForm } from "@/components/shared/AddTaskForm";

interface AddTaskProps {
  isSubTask: boolean;
  parentTask?: Task | null;
}

const AddTask = ({ isSubTask, parentTask }: AddTaskProps) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  // close the add task form when clicking Esc key
  useEffect(() => {
    const handleEscapeKeyClosing = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAddTaskForm(false);
      }
    };
    if (showAddTaskForm) {
      document.addEventListener("keydown", handleEscapeKeyClosing);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyClosing);
    };
  }, [showAddTaskForm]);

  return (
    <div className={styles.add_task_root}>
      {showAddTaskForm ? (
        <AddTaskForm
          isSubTask={isSubTask}
          parentTask={parentTask}
          setShowAddTaskForm={setShowAddTaskForm}
        />
      ) : (
        <Button
          sx={{ textTransform: "none" }}
          variant="text"
          startIcon={<AddCircleIcon />}
          size="small"
          color={isSubTask ? "secondary" : "reddy"}
          onClick={() => setShowAddTaskForm((v) => !v)}
        >
          {isSubTask ? "Add SubTask" : "Add Task"}
        </Button>
      )}
    </div>
  );
};

export default AddTask;
