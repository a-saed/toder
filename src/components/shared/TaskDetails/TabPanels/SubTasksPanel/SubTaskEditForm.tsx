import { useState } from "react";
import { Box, TextField } from "@mui/material";
import styles from "@/styles/TaskDetails.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { updateTask } from "@/services/db.service";
import { handleKeyDown } from "@/utils/forms.utils";

interface SubTaskEditFormProps {
  subtask: SubTask;
  parentTask: Task;
  handleCancel: () => void;
}

const SubTaskEditForm = ({
  subtask,
  handleCancel,
  parentTask,
}: SubTaskEditFormProps) => {
  const [currSubTaskName, setCurrSubTaskName] = useState(subtask.name);
  const [currSubTaskDesc, setCurrSubTaskDesc] = useState(subtask.description);

  const handleUpdateSubTask = async () => {
    parentTask.subTasks.map((subT) => {
      if (subtask._id === subT._id) {
        subT.name = currSubTaskName;
        subT.description = currSubTaskDesc;
      }
      return subT;
    });

    const { ok } = await updateTask(parentTask);
    if (ok) {
      console.info("subtask updated succefully");
      handleCancel();
    }
  };

  // const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
  //   if (!currSubTaskName.trim()) return;
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     handleUpdateSubTask();
  //   }
  // };

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
          if (!currSubTaskName.trim()) return;
          handleUpdateSubTask();
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
        value={currSubTaskName}
        onChange={(e) => setCurrSubTaskName(e.target.value)}
        autoFocus
        InputProps={{
          disableUnderline: true,
        }}
        inputProps={{
          className: styles.subTaskTitle,
        }}
      />
      <TextField
        id="task-description"
        size="small"
        placeholder="Description"
        variant="standard"
        multiline
        InputProps={{ disableUnderline: true }}
        inputProps={{
          className: styles.subTaskDesc,
        }}
        onChange={(e) => setCurrSubTaskDesc(e.target.value)}
        value={currSubTaskDesc}
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
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="reddy"
          sx={{ textTransform: "none" }}
          disabled={
            !currSubTaskName.trim() ||
            (currSubTaskName === subtask.name &&
              currSubTaskDesc === subtask.description)
          }
          onClick={handleUpdateSubTask}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default SubTaskEditForm;
