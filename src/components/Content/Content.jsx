import useItemsByTerm from "@/shared/hooks/useItemsByTerm";
import { useCallback, useState } from "react";
import Search from "../Search/Search";
import TodoItem from "../TodoItem/TodoItem";
import TodoList from "../TodoList/TodoList";
import styles from "./Content.module.scss";

const Content = (props) => {
  const [items, setItems] = useState(props.items ?? []);
	const [searchTerm, setTerm] = useState('')
	const filteredItems = useItemsByTerm(items, searchTerm);

  const onToggleTodo = useCallback((title) => {
    setItems((p) =>
      p.map((item) => {
        if (item.title === title) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      })
    );
  }, []);

  const onDeleteTodo = useCallback((title) => {
    setItems((p) => p.filter((item) => item.title !== title));
  }, []);

  return (
    <div className={styles.Content}>
      <div className={styles.header}>
        <h1 className={styles.title}>{props.title}</h1>
        <Search onSearch={setTerm} />
      </div>
      <TodoList>
        {filteredItems.map((el) => (
          <TodoItem onSelect={onToggleTodo} onDelete={onDeleteTodo} {...el} />
        ))}
      </TodoList>
    </div>
  );
};

export default Content;
