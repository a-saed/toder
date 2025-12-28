import { useState } from "react";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styles from "@/styles/LeftPane.module.css";
import { AddTaskForm } from "@/components/shared/AddTaskForm";
import useCloseOnEscape from "@/hooks/useCloseOnEscape";

interface AddTaskProps {
  isSubTask: boolean;
  parentTask?: Task | null;
}

const AddTask = ({ isSubTask, parentTask }: AddTaskProps) => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  // close the add task form when clicking Esc key
  useCloseOnEscape(showAddTaskForm, () => setShowAddTaskForm(false));

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
