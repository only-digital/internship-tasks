import { useState } from "react";
import styled from "./TaskList.module.scss";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = ({ tasks, title }) => {
  const [data, setData] = useState(tasks);
  console.log(data);
  return (
    <>
      <h3 className={styled.TaskList__title}>{title}</h3>
      <div className={styled.TaskList__items}>
        <TaskItem tasks={data} />
      </div>
    </>
  );
};

export default TaskList;
