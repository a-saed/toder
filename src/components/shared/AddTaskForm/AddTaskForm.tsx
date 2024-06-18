import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { addTask, updateTask } from "@/services/db.service";
import { DueDateSelector, PrioritySelector } from "@/components/Selectors";
import dayjs, { Dayjs } from "dayjs";
import { proiorities } from "@/data/constants";
import { generateUniqueId } from "@/utils/general.util";

interface AddTaskFormProps {
  setShowAddTaskForm?: (v: boolean) => void;
  isSubTask: boolean;
  parentTask?: Task | null;
}

export const AddTaskForm = ({
  setShowAddTaskForm,
  isSubTask,
  parentTask,
}: AddTaskFormProps) => {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedPriority, setSelectedPriority] = useState<PriorityItem>(
    proiorities[2]
  );

  const resetInputs = () => {
    setTaskName("");
    setTaskDesc("");
  };

  const createTask = async () => {
    const { ok } = await addTask({
      _id: new Date().toISOString(),
      name: taskName,
      description: taskDesc,
      isSubTask: false,
      dueDate: selectedDate
        ? selectedDate.toISOString()
        : new Date().toISOString(),
      priority: selectedPriority,
      subTasks: [],
      completed: false,
    });
    if (ok) resetInputs();
  };

  const createSubTask = async () => {
    const newSubTask: SubTask = {
      _id: generateUniqueId(),
      name: taskName,
      description: taskDesc,
      completed: false,
    };
    if (parentTask) {
      parentTask.subTasks = [...(parentTask?.subTasks || []), newSubTask];
    }

    const { ok } = await updateTask(parentTask as Task);
    if (ok) resetInputs();
  };

  return (
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
          id="task-name"
          size="small"
          placeholder="Task name"
          fullWidth
          variant="standard"
          multiline
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
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
        <TextField
          id="task-description"
          size="small"
          placeholder="Description"
          variant="standard"
          multiline
          InputProps={{ disableUnderline: true }}
          inputProps={{
            style: { color: "#FDFDFD", fontSize: 15 },
          }}
          onChange={(e) => setTaskDesc(e.target.value)}
          value={taskDesc}
        />
        {!isSubTask ? (
          <div style={{ display: "flex", marginTop: 5 }}>
            <DueDateSelector
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              view="create"
            />
            <PrioritySelector
              selectedPriority={selectedPriority}
              setSelectedPriority={setSelectedPriority}
              view="create"
            />
          </div>
        ) : null}
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
          onClick={() => setShowAddTaskForm!(false)}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="reddy"
          disabled={!taskName.trim()}
          onClick={isSubTask ? createSubTask : createTask}
        >
          Add
        </Button>
      </Stack>
    </div>
  );
};
