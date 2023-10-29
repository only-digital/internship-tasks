import React from "react";
import TodoItem from "../todo-item/todo-item";
import styled from "./todo-list.module.scss";
import SearchField from "../search-field/search-field";
import useSearch from "@/hooks/useSearch";

const TodoList = ({ title, items }) => {
  const [todos, setTodos] = React.useState(items);
  const [searchString, setSearchString] = React.useState("");

  const filteredTodos = useSearch(searchString, todos);

  const removeTodo = (item) => {
    setTodos(todos.filter((todo) => todo.title != item.title));
  };

  const completeTodo = (item) => {
    const index = todos.indexOf(item);
    const updatedTodos = [...todos];
    updatedTodos[index] = {
      ...updatedTodos[index],
      isCompleted: !updatedTodos[index].isCompleted,
    };
    setTodos(updatedTodos);
  };

  return (
    <div className={styled.wrapper}>
      <div className={styled.header}>
        <h2 className={styled.title}>{title}</h2>
        <SearchField setString={setSearchString} />
      </div>
      {filteredTodos.map((todo, i) => (
        <TodoItem
          key={i}
          item={todo}
          remove={removeTodo}
          complete={completeTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
