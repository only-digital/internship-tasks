import { useEffect, useState } from "react";
import styled from "./task-page.module.scss";
import Search from "../search/search";
import TaskList from "../task-list/task-list";

const TaskPage = ({ title, tasks }) => {
  const [items, setItems] = useState();
  const [searchRes, setSearchRes] = useState(items);

  useEffect(() => {
    const newTask = tasks.map((task, index) => ({ ...task, id: index }));
    setItems(newTask);
  }, []);

  useEffect(() => {
    setSearchRes(items);
  }, [items]);

  const handleItemChange = (newTasks) => {
    setItems(newTasks);
  };

  const handleSearch = (newTasks) => {
    setSearchRes(newTasks);
  };

  return (
    <div className={styled.taskPage}>
      <div className={styled.header}>
        <h1 className={styled.title}>{title}</h1>
        <Search tasks={items} setTasks={handleSearch} />
      </div>
      <TaskList
        tasks={searchRes}
        allTasks={items}
        setTasks={handleItemChange}
      />
    </div>
  );
};

export default TaskPage;
