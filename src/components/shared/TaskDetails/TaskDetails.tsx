import { Typography } from "@mui/material";
import styles from "@/styles/TaskDetails.module.css";
import TaskDetailsSideBar from "./TaskDetailsSideBar";
import TaskDetailsMainContent from "./TaskDetailsMainContent";
import TaskDetailsTabs from "./TaskDetailsTabs";
import TaskDetailsActions from "./TaskDetailsActions";

export const TaskDetails = ({ task }: { task: Task }) => {
  return (
    <div className={styles.root}>
      <div className={styles.contentContainer}>
        <div className={styles.taskDetailsHeader}>
          <TaskDetailsMainContent task={task} />
          <TaskDetailsActions task={task} />
        </div>
        <TaskDetailsTabs />
      </div>
      <div className={styles.sideBarContainer}>
        <TaskDetailsSideBar task={task} />
      </div>
    </div>
  );
};
