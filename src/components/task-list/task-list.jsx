import Index from "@/pages";
import TaskItem from "../task-item/task-item";
import styled from "./task-list.module.scss";

const TaskList = ({ tasks, setTasks }) => {
  return (
    <div className={styled.TaskList}>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          item={task}
          onDelete={() => {
            const newTasks = tasks.filter((item, i) => i !== index);
            setTasks(newTasks);
          }}
          toggleComplete={() => {
            const newTasks = tasks.map((item, i) =>
              i !== index ? item : { ...item, isCompleted: !item.isCompleted }
            );
            setTasks(newTasks);
          }}
        />
      ))}
    </div>
  );
};

export default TaskList;
