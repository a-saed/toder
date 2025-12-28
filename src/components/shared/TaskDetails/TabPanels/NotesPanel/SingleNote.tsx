import { useState } from "react";
import { Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { NoteEditForm } from "./NoteEditForm";
import useCloseOnEscape from "@/hooks/useCloseOnEscape";
import { updateTask } from "@/services/db.service";

export const SingleNote = ({ note, task }: { note: Note; task: Task }) => {
  const [editMode, setEditMode] = useState(false);
  const [showItemControls, setShowItemControls] = useState(false);

  useCloseOnEscape(editMode, () => setEditMode(false));

  const deleteNote = async (noteId: string) => {
    if (window.confirm(`are you sure ?`)) {
      task.notes = task?.notes?.filter((item) => item.id !== noteId);

      const { ok } = await updateTask(task);
      if (ok) {
        console.info(`${noteId} note deleted successfully!!`);
      }
    }
  };

  return (
    <div style={{ position: "relative", marginTop: "15px" }}>
      {editMode ? (
        <NoteEditForm
          note={note}
          onCancel={() => setEditMode(false)}
          task={task}
        />
      ) : (
        <Box
          sx={{
            p: 1,
            border: "1px solid #222",
            borderRadius: 2,
            backgroundColor: "#1E1E1E",
            width: "100%",
            display: "flex",
            alignItems: "center",
            cursor: "text",
            position: "relative",
          }}
          onMouseEnter={() => setShowItemControls(true)}
          onMouseLeave={() => setShowItemControls(false)}
        >
          <Box sx={{ width: "90%" }}>
            <Typography
              onClick={() => setEditMode(true)}
              variant="body1"
              sx={{ wordBreak: "break-all" }}
            >
              {note.text}
            </Typography>
          </Box>
          {showItemControls && (
            <Box
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <DeleteIcon
                onClick={() => deleteNote(note?.id)}
                sx={{
                  cursor: "pointer",
                  fontSize: "1.3rem",
                  color: "#999",
                  "&:hover": { color: "#CCC" },
                }}
              />
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};

export default SingleNote;
