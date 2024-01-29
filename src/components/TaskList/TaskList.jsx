import { useState } from "react";
import styled from "./TaskList.module.scss";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = ({ tasks, title }) => {
  const [data, setData] = useState(tasks);

  console.log(data);

  const handleDelete = (id) => {
    setData((prev) => prev.filter((task) => task.id !== id));
  };

  const handleChangeStatus = (id) => {
    const index = data.findIndex((task) => task.id === id);
    const newArr = [...data];
    newArr[index].isCompleted = !newArr[index].isCompleted;
    setData(newArr);
  };

  return (
    <>
      <h3 className={styled.TaskList__title}>{title}</h3>
      <div className={styled.TaskList__items}>
        {data.length ? (
          <TaskItem
            tasks={data}
            onChange={handleChangeStatus}
            onDelete={handleDelete}
          />
        ) : (
          "пуст..."
        )}
      </div>
    </>
  );
};

export default TaskList;
