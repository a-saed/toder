import { Box } from "@mui/system";
// import { randomUUID } from "crypto";
import { useTaskStore } from "@/store/task.store";
import { AddNoteForm } from "./AddNoteForm";
import { SingleNote } from "./SingleNote";

export const NotesPanel = () => {
  const { selectedTask } = useTaskStore();

  return (
    <Box sx={{ width: "100%" }}>
      <AddNoteForm selectedTask={selectedTask} />

      {/* show notes list */}
      <Box sx={{ mt: 0 }}>
        {selectedTask?.notes?.map((note) => {
          return <SingleNote note={note} task={selectedTask} />;
        })}
      </Box>
    </Box>
  );
};
