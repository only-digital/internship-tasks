import styled from "./TaskItem.module.scss";

const TaskItem = ({ task, deleteTask, changeStatusTask }) => {
  const { title, text, isCompleted } = task;

  return (
    <li className={styled.TaskItem} onClick={() => changeStatusTask(task.id)}>
      <div className={styled.header}>
        <h3
          className={`${styled.title} ${isCompleted ? styled.completed : ""}`}
        >
          {title}
        </h3>
        <button
          onClick={() => deleteTask(task.id)}
          className={styled.deleteBtn}
        >
          <img src="/icons/delete.svg" alt="удалить" width={26} height={26} />
        </button>
      </div>
      <p className={styled.desc}>{text}</p>
    </li>
  );
};

export default TaskItem;
