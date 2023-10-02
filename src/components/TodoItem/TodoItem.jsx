import cn from "@/shared/utils/cn";
import { memo } from "react";
import styles from "./TodoItem.module.scss";

const TodoItem = (props) => {
  return (
    <div
      onClick={() => props.onSelect(props.title)}
      className={cn(styles.TodoItem, props.isCompleted && styles.completed)}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{props.title}</h2>
        <button onClick={() => props.onDelete(props.title)} className={styles.deleteBtn}></button>
      </div>
      <p className={styles.text}>{props.text}</p>
    </div>
  );
};

export default memo(TodoItem);
