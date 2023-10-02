import { Children, memo } from "react";
import styled from "./TodoList.module.scss";

const TodoList = (props) => {
  return (
    <ul className={styled.TodoList}>
      {Children.map(props.children, (el) => (
        <li className={styled.item}>{el}</li>
      ))}
    </ul>
  );
};

export default TodoList;
