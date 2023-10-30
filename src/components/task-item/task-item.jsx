import { useState } from "react";
import styled from "./task-item.module.scss";
import Image from "next/image";

const TaskItem = ({ task, tasksArray, setTasksArray }) => {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const clickRemoveTask = () => {
    const updateTasks = tasksArray.filter(
      (current) => current.title !== task.title
    );
    setTasksArray(updateTasks);
  };

  return (
    <div
      className={styled.TaskItem}
      onClick={() => setIsCompleted(!isCompleted)}
    >
      <div className={styled.TaskItem__top}>
        <h5
          className={[
            styled.TaskItem__title,
            isCompleted ? styled.TaskItem__title_completed : "",
          ]
            .join(" ")
            .trim()}
        >
          {task.title}
        </h5>
        <button className={styled.TaskItem__remove} onClick={clickRemoveTask}>
          <Image src="/remove.svg" width={26} height={26} alt="remove" />
        </button>
      </div>
      <p className={styled.TaskItem__text}>{task.text}</p>
    </div>
  );
};

export default TaskItem;
