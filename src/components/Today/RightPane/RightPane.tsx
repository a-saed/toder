import InfoIcon from "@mui/icons-material/Info";
import { useTaskStore } from "@/store/task.store";

import styles from "@/styles/RightPane.module.css";
import { TaskDetails } from "@/components/shared/TaskDetails";

export const RightPane = () => {
  const { selectedTask } = useTaskStore();
  return (
    <div className={styles.root}>
      {selectedTask ? (
        <TaskDetails task={selectedTask} />
      ) : (
        <div className={styles.alertInfoContainer}>
          <InfoIcon color="info" sx={{ m: 1 }} />
          <p> select a task to show its details. </p>
        </div>
      )}
    </div>
  );
};
