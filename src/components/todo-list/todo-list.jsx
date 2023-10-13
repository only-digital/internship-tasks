import { useState } from "react";
import { Search } from "./components/search/search";
import { Todo } from "./components/todo/todo";
import styled from "./todo-list.module.scss";

export const TodoList = ({ todos }) => {
  const { title, tasks } = todos;
  const [todoList, setTodolist] = useState(tasks);
  const [sortTodoList, setSortTodoList] = useState(todoList);
  
  
  return (
    <div className={styled.todoList}>
      <div className={styled.todoList__header}>
        <div>{title}</div>
        <Search todoList={todoList} setSortTodoList={setSortTodoList} />
      </div>
      {sortTodoList.map(({ title, text, isCompleted}, index) => (
        <Todo
          key={index}
          id={index}
          title={title}
          text={text}
          complit={isCompleted}
          sortTodoList={sortTodoList}          
          setTodolist={setTodolist}
        />
      ))}
    </div>
  );
};
