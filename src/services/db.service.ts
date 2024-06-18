import { useTaskStore } from "@/store/task.store";
import PouchDB from "pouchdb";

export const tasksDB = new PouchDB("tasks");
tasksDB
  .changes({
    since: "now",
    live: true,
  })
  .on("change", () => useTaskStore.getState().loadTasks());

export const addTask = async (task: Partial<Task>) =>
  tasksDB
    .put(task)
    .then((res) => ({ ok: res.ok }))
    .catch((err) => {
      console.error(err);
      return { ok: false };
    });

export const getAllTasks = () =>
  tasksDB
    .allDocs({ include_docs: true, descending: true })
    .then((res) => ({ ok: true, rows: res.rows }))
    .catch((err) => {
      console.error(err);
      return { ok: false, rows: null };
    });

export const updateTask = async (task: Partial<Task>) =>
  tasksDB
    .put(task)
    .then(async (res) => {
      const newTask = await tasksDB.get(res.id);
      // update the selected task with new data
      useTaskStore.getState().updateSelectedTask(newTask as unknown as Task);
      return { ok: res.ok };
    })
    .catch((err) => {
      console.error(err);
      return { ok: false };
    });

export const deleteTask = async (taskId: string) =>
  tasksDB
    .get(taskId)
    .then((doc) => tasksDB.remove(doc))
    .then(async (res) => {
      // update selected task with null
      useTaskStore.getState().setSelectedTask(null);
      return { ok: res.ok };
    })
    .catch((err) => {
      console.error(err);
      return { ok: false };
    });

export const addNote = async (taskId: string, note: Note) => {
  try {
    const doc: Partial<Task> = await tasksDB.get(taskId);
    const newTask = {
      ...doc,
      notes: [...(doc.notes ?? []), note],
    };
    const res = await tasksDB.put(newTask);
    const updatedTask = await tasksDB.get(res.id);
    useTaskStore.getState().updateSelectedTask(updatedTask as unknown as Task);
    return { ok: res.ok };
  } catch (err) {
    console.error(err);
    return { ok: false };
  }
};
