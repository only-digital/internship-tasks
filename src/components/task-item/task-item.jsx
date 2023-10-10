import styled from "./task-item.module.scss";
import cross from "../../../public/images/cross.svg";
import Image from "next/image";

const TaskItem = ({ item, onDelete, toggleComplete }) => {
  return (
    <div
      className={`${styled.TaskItem} ${item.isCompleted && styled.completed}`}
      onClick={() => toggleComplete()}
    >
      <div className={styled.header}>
        <h2 className={styled.title}>{item.title}</h2>
        <Image
          className={styled.cross}
          src={cross}
          width={20}
          height={20}
          alt=""
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </div>
      <p className={styled.text}>{item.text}</p>
    </div>
  );
};

export default TaskItem;
