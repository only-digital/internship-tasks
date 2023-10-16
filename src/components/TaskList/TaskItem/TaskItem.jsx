import styled from "./TaskItem.module.scss";
import iconClose from "@/assets/icons/close-svg.svg";
import Image from "next/image";
import { classNames } from "@/lib/classNames/classNames";

const TaskItem = ({ props, removeTask, handleCompleted }) => {
  const { id, title, text, isCompleted } = props;

  return (
    <div
      className={styled.TaskItem}
    >
      <div className={styled.header}>
        <h3
          className={classNames(
            styled.title,
            { [styled["done"]]: isCompleted },
            []
          )}
          onClick={() => handleCompleted(id)}
        >
          {title}
        </h3>
        <button onClick={() => removeTask(id)}>
          <Image src={iconClose} alt="close"></Image>
        </button>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default TaskItem;
