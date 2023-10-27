import React from "react";
import TodoItem from "../todo-item/todo-item";
import styled from "./todo-list.module.scss";

const TodoList = ({ title, items }) => {
  const [todos, setTodos] = React.useState(items);
  console.log(todos);

  return (
    <div className={styled.wrapper}>
      <h2 className={styled.title}>{title}</h2>
      {todos.map((todo, i) => (
        <TodoItem
          key={i}
          title={todo.title}
          text={todo.text}
          isCompleted={todo.isCompleted}
        />
      ))}
    </div>
  );
};

export default TodoList;
