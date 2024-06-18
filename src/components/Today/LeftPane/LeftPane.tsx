import { TaskList } from "@/components/shared/TaskList";
import AddTask from "./AddTask";

import styles from "@/styles/LeftPane.module.css";

export const LeftPane = () => {
  return (
    <div className={styles.left_pane_root}>
      <AddTask isSubTask={false}/>
      <TaskList />
    </div>
  );
};
