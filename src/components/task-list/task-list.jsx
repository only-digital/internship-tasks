import Index from "@/pages";
import TaskItem from "../task-item/task-item";
import styled from "./task-list.module.scss";
import { useEffect } from "react";

const TaskList = ({ tasks, allTasks, setTasks }) => {
  return (
    <div className={styled.TaskList}>
      {tasks &&
        tasks.map((task, index) => (
          <TaskItem
            key={index}
            item={task}
            onDelete={() => {
              const newTasks = allTasks.filter((item) => item.id !== task.id);
              setTasks(newTasks);
            }}
            toggleComplete={() => {
              const newTasks = allTasks.map((item) =>
                item.id === task.id
                  ? { ...item, isCompleted: !item.isCompleted }
                  : item
              );
              setTasks(newTasks);
            }}
          />
        ))}
    </div>
  );
};

export default TaskList;
