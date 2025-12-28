import { useState } from "react";
import { updateTask } from "@/services/db.service";
import { handleKeyDown } from "@/utils/forms.utils";
import { Button, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";

interface NoteEditFormProps {
  note: Note;
  onCancel: () => void;
  task: Task;
}

export const NoteEditForm = ({ note, onCancel, task }: NoteEditFormProps) => {
  const [currNoteTxt, setCurrNoteTxt] = useState(note.text);

  const handleUpdateNote = async () => {
    task?.notes?.map((item) => {
      if (note.id === item.id) {
        item.text = currNoteTxt;
      }
      return item;
    });

    const { ok } = await updateTask(task);
    if (ok) {
      console.info("subtask updated succefully");
      onCancel();
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { width: "100%" },
        width: "100%",
        border: "1px solid #2D2D2D",
        borderRadius: 2,
        p: 1,
      }}
      noValidate
      autoComplete="off"
      onKeyDown={(e) =>
        handleKeyDown(e, () => {
          if (!currNoteTxt.trim()) return;
          handleUpdateNote();
        })
      }
    >
      <TextField
        id="task-name"
        size="small"
        placeholder="Task name"
        fullWidth
        variant="standard"
        multiline
        value={currNoteTxt}
        onChange={(e) => setCurrNoteTxt(e.target.value)}
        autoFocus
        InputProps={{
          disableUnderline: true,
        }}
      />

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
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="reddy"
          sx={{ textTransform: "none" }}
          disabled={!currNoteTxt.trim() || currNoteTxt === note.text}
          onClick={handleUpdateNote}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};
