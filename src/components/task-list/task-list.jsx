import { useState } from "react";
import styled from "./task-list.module.scss";
import useSearch from "@/hooks/useSearch";
import InputSearch from "../input-search/input-search";
import TaskItem from "../task-item/task-item";

const TaskList = ({ title, tasks }) => {
  const [search, setSearch] = useState("");
  const [tasksArray, setTasksArray] = useState(tasks);
  const { searchTasks } = useSearch(tasksArray, search);

  return (
    <div className={styled.TaskList}>
      <div className={styled.TaskList__top}>
        <h1 className={styled.TaskList__title}>{title}</h1>
        <InputSearch search={search} setSearch={setSearch} />
      </div>

      {searchTasks.map((task) => (
        <TaskItem
          task={task}
          tasksArray={tasksArray}
          setTasksArray={setTasksArray}
          key={`__task__${task.title}`}
        />
      ))}
    </div>
  );
};

export default TaskList;
