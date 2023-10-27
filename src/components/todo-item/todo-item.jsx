import styled from "./todo-item.module.scss";

const TodoItem = ({ title, text, isCompleted }) => {
  return (
    <div className={styled.card}>
      <div className={styled.header}>
        <h5 className={styled.title}>{title}</h5>
        <img src="/delete-icon.svg" alt="delete-icon" />
      </div>
      <p className={styled.text}>{text}</p>
    </div>
  );
};

export default TodoItem;
