import styles from "@/styles/TaskDetails.module.css";
import dayjs, { Dayjs } from "dayjs";
import { Divider, Typography } from "@mui/material";
import { DueDateSelector, PrioritySelector } from "@/components/Selectors";
import { updateTask } from "@/services/db.service";

const TaskDetailsSideBar = ({ task }: { task: Task }) => {
  const handleChangeDueDate = async (newVal: Dayjs | null) => {
    task.dueDate = newVal?.toISOString() as string;
    const { ok } = await updateTask(task);
    if (ok) console.info("updated!!!!1");
  };

  const handleChangePriority = async (newVal: PriorityItem) => {
    task.priority = newVal;
    const { ok } = await updateTask(task);
    if (ok) console.info("updated!!!!1");
  };
  return (
    <div className={styles.sideBarRoot}>
      <Typography variant="body2" color="text.secondary">
        Due date
      </Typography>
      <DueDateSelector
        selectedDate={dayjs(task.dueDate)}
        setSelectedDate={handleChangeDueDate}
        view="details"
        canEdit={!task.completed}
      />
      <Divider sx={{ m: 2 }} />
      <Typography variant="body2" color="text.secondary">
        Priority
      </Typography>
      <PrioritySelector
        selectedPriority={task.priority}
        setSelectedPriority={handleChangePriority}
        view="details"
        canEdit={!task.completed}
      />
      <Divider sx={{ m: 2 }} />
      <Typography variant="body2" color="text.secondary">
        Reminders
      </Typography>
      <p>...</p>
      <Divider sx={{ m: 2 }} />
    </div>
  );
};

export default TaskDetailsSideBar;
