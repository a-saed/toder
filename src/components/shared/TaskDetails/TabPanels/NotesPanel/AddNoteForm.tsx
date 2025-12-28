import { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { addNote } from "@/services/db.service";
import useCloseOnEscape from "@/hooks/useCloseOnEscape";
import { handleKeyDown } from "@/utils/forms.utils";

export const AddNoteForm = ({
  selectedTask,
}: {
  selectedTask: Task | null;
}) => {
  const [note, setNote] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);

  const handleCancel = () => {
    setNote("");
    setShowNoteForm(false);
  };

  // Close the add form on clicking Esc key
  useCloseOnEscape(showNoteForm, handleCancel);

  const handleAddNote = async () => {
    const { ok } = await addNote(selectedTask?._id as string, {
      id: Date.now().toLocaleString(),
      text: note,
    });

    if (ok) {
      setNote("");
    }
  };

  return (
    <Box sx={{ width: "85%", m: "0 auto" }}>
      {!showNoteForm ? (
        <Button
          variant="text"
          size="small"
          startIcon={<AddCircleIcon />}
          color="secondary"
          sx={{ textTransform: "none" }}
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
              width: "85%",
            }}
            noValidate
            autoComplete="off"
            onKeyDown={(e) =>
              handleKeyDown(e, () => {
                if (!note.trim()) return;
                handleAddNote();
              })
            }
          >
            <TextField
              id="note"
              size="small"
              placeholder="Note..."
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
              onClick={handleCancel}
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
    </Box>
  );
};
