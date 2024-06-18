import { Typography } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import styles from "@/styles/Task.module.css";
import { useTaskStore } from "@/store/task.store";

type TaskProps = {
  provided?: any;
  item: Task;
};

export const Task = ({ item, provided }: TaskProps) => {
  const { selectedTask, setSelectedTask } = useTaskStore();
  return (
    <div
      className={styles.task_container}
      onClick={() => setSelectedTask(item)}
    >
      {!item.completed ? (
        <span {...provided.dragHandleProps}>
          <DragIndicatorIcon className={styles.drag_icon} />
        </span>
      ) : null}

      <div
        className={`${styles.task_item} ${
          selectedTask?._id === item._id ? styles.selected_task : null
        }`}
      >
        <Typography
          variant="body2"
          className={`${styles.task_name} ${
            item.completed ? styles.completed : null
          }`}
        >
          {item.name}
        </Typography>
        <Typography
          variant="caption"
          className={`${styles.task_desc} ${
            item.completed ? styles.completed : null
          }`}
        >
          {item.description}
        </Typography>
      </div>
    </div>
  );
};
