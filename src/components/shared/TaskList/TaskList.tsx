import { useEffect, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { StrictModeDroppable } from "@/components/shared/StrictModeDroppable";
import { Task } from "@/components/shared/Task";
import styles from "@/styles/Task.module.css";
import { useTaskStore } from "@/store/task.store";
import { isTruthy } from "@/utils/general.util";
import { Box, Button, Typography } from "@mui/material";

const reorder = (list: Task[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const TaskList = () => {
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const { tasks, updateAllTasks, loadTasks } = useTaskStore();

  const completedTasks = tasks.filter((t) => t.completed);
  const unCompletedTasks = tasks.filter((t) => !t.completed);

  useEffect(() => {
    // initial loading all tasks
    loadTasks();
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    updateAllTasks(newItems as Task[]);
  };

  return (
    <div className={styles.task_list}>
      {isTruthy(tasks) ? (
        <>
          {/*  show uncompleted tasks */}
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="droppable">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{}}
                >
                  {unCompletedTasks.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Task provided={provided} item={item} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>

          {/* show completed tasks */}

          {isTruthy(completedTasks) ? (
            <div style={{ marginTop: "3rem" }}>
              <div>
                <Button
                  variant="text"
                  size="small"
                  sx={{ textTransform: "none" }}
                  endIcon={
                    showCompletedTasks ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                  onClick={() => setShowCompletedTasks((v) => !v)}
                >
                  Show completed tasks
                </Button>
                <Typography variant="caption" sx={{ color: "#777", ml: 1 }}>
                  {completedTasks.length}/{tasks.length}
                </Typography>
              </div>

              <Box sx={{ m: 1 }}>
                {showCompletedTasks
                  ? tasks
                      .filter((t) => t.completed)
                      .map((task, i) => (
                        <div key={i}>
                          <Task item={task} />
                        </div>
                      ))
                  : null}
              </Box>
            </div>
          ) : null}
        </>
      ) : (
        //
        <div className={styles.add_task_alert}>
          <InfoIcon color="info" sx={{ m: 1 }} />
          <p>start by adding some task!</p>
        </div>
      )}
    </div>
  );
};
