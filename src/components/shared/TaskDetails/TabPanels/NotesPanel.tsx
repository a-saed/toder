import { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
// import { randomUUID } from "crypto";
import { addNote } from "@/services/db.service";
import { useTaskStore } from "@/store/task.store";

export const NotesPanel = () => {
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [note, setNote] = useState("");
  const { selectedTask } = useTaskStore();

  const handleAddNote = async () => {
    const { ok } = await addNote(selectedTask?._id as string, {
      id: Date.now().toLocaleString(),
      text: note,
    });
    console.log({ selectedTask });

    if (ok) {
      console.log({ ok });
    }

    // if (ok) console.log({ ok });
  };

  console.log({ selectedTask });

  return (
    <Box sx={{ ml: 6, mt: 0.5 }}>
      {!showNoteForm ? (
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          sx={{ borderRadius: "20px", p: "2px 20px" }}
          onClick={() => setShowNoteForm(true)}
        >
          Add Note
        </Button>
      ) : (
        <div
          style={{
            border: "1px solid #3D3D3D",
            borderRadius: "10px",
            padding: "5px 10px 5px",
          }}
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
              width: "100%",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="note"
              size="small"
              placeholder="Note"
              fullWidth
              variant="standard"
              multiline
              value={note}
              onChange={(e) => setNote(e.target.value)}
              autoFocus
              InputProps={{
                disableUnderline: true,
              }}
              InputLabelProps={{
                style: { color: "#F00" },
              }}
              inputProps={{
                style: { color: "#FDFDFD", fontSize: 15 },
              }}
            />
          </Box>
          <Stack
            sx={{
              justifyContent: "flex-end",
              "& > :not(style)": { p: 0 },
            }}
            spacing={1.2}
            direction="row"
          >
            <Button
              size="small"
              variant="text"
              color="warning"
              sx={{ textTransform: "none" }}
              onClick={() => setShowNoteForm(false)}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              color="reddy"
              disabled={!note.trim()}
              onClick={handleAddNote}
            >
              Add
            </Button>
          </Stack>
        </div>
      )}

      <Box sx={{ mt: 5 }}>
        {selectedTask?.notes?.map((note) => {
          return <div key={note.id}>{note.text}</div>;
        })}
      </Box>
    </Box>
  );
};
