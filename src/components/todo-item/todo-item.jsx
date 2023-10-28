import styled from "./todo-item.module.scss";

const TodoItem = ({ item, remove, complete }) => {
  return (
    <div
      className={`${styled.card}${
        item.isCompleted ? " " + styled.completed : ""
      }`}
      onClick={(e) => {
        if (!e.target.closest(`.${styled.icon}`)) {
          complete(item);
        }
      }}
    >
      <div className={styled.header}>
        <h5 className={styled.title}>{item.title}</h5>
        <img
          src="/delete-icon.svg"
          alt="delete-icon"
          className={styled.icon}
          onClick={() => remove(item)}
        />
      </div>
      <p className={styled.text}>{item.text}</p>
    </div>
  );
};

export default TodoItem;
