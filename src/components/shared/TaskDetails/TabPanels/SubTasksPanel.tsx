import AddTask from "@/components/Today/LeftPane/AddTask";
import { useTaskStore } from "@/store/task.store";
import SingleSubTask from "./SingleSubTask";

export const SubTasksPanel = () => {
  const { selectedTask } = useTaskStore();

  const completedSubTasks = selectedTask?.subTasks.filter((t) => t.completed);
  const unCompletedSubTasks = selectedTask?.subTasks.filter(
    (t) => !t.completed
  );

  return (
    <div>
      {!selectedTask?.completed && (
        <AddTask isSubTask={true} parentTask={selectedTask} />
      )}

      {/* show uncompleted subtasks */}
      {selectedTask &&
        unCompletedSubTasks &&
        unCompletedSubTasks?.map((subTask, i) => (
          <SingleSubTask
            key={i}
            subTask={subTask}
            parentTask={selectedTask}
            isCompleted={false}
          />
        ))}

      {/* show completed subtasks */}
      {selectedTask &&
        completedSubTasks &&
        completedSubTasks?.map((subTask, i) => (
          <SingleSubTask
            key={i}
            subTask={subTask}
            parentTask={selectedTask}
            isCompleted={true}
          />
        ))}
    </div>
  );
};
