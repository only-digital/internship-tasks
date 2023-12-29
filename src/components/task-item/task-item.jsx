import styled from "./task-item.module.scss";
import Image from "next/image";

const TaskItem = (props) => {

  const handleCompleted = () => props.onCompleted(props.task.id);
  const handleRemove = () => props.onRemove(props.task.id);

  return (
    <div className={styled.TaskItem}>
      <div className={styled.TaskItem__head}>
        <h3
          className={
            props.task.isCompleted
              ? styled.TaskItem__title + " " + styled.TaskItem__title_completed
              : styled.TaskItem__title
          }
          onClick={handleCompleted}
        >
          {props.task.title}
        </h3>
        <button
          className={styled.TaskItem__button}
          onClick={handleRemove}
        >
          <Image src="/close.svg" width={26} height={26} alt="remove" />
        </button>
      </div>
      <div className={styled.TaskItem__text}>{props.task.text}</div>
    </div>
  );
};

export default TaskItem;
