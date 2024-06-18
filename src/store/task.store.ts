import { getAllTasks } from "@/services/db.service";
import { create } from "zustand";

interface TaskStore {
  tasks: Task[];
  selectedTask: Task | null;
  setSelectedTask: (selectedTask: Task | null) => void;
  updateSelectedTask: (newTask: Task) => void;
  loadTasks: () => void;
  updateAllTasks: (newTasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>()((set, get) => ({
  tasks: [],
  selectedTask: null,
  setSelectedTask: (selectedTask: Task | null) => {
    const prevSelectedTask = get().selectedTask;
    // unselect the previous selected task
    if (
      selectedTask === null ||
      (prevSelectedTask && prevSelectedTask._id === selectedTask._id)
    ) {
      return set({ selectedTask: null });
    }

    // select new task
    set({ selectedTask });
  },
  updateSelectedTask: (newTask: Task) => {
    const currSelectedTask = get().selectedTask;
    if (newTask && newTask._id === currSelectedTask?._id) {
      return set({ selectedTask: newTask });
    }
  },
  loadTasks: async () => {
    try {
      const { rows } = await getAllTasks();
      const tasks = rows?.map((r) => r.doc) as unknown as Task[];
      set({ tasks });
      return tasks;
    } catch (err) {
      console.error(err);
    }
  },
  updateAllTasks: (newTasks: Task[]) => set({ tasks: newTasks }),
}));
