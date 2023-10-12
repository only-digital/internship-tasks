import { useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import styled from "./Main.module.scss";
import SearchInput from "../SearchInput/SearchInput";
import { useSearchItems } from "@/hooks/useSearchItems";

const Main = ({ title, tasks }) => {
  const [currentTasks, setCurrentTasks] = useState(tasks || []);
  const [searchQuery, setSearchQuery] = useState("");

  const deleteTask = (id) => {
    setCurrentTasks((prev) => prev.filter((task) => task.id !== id));
  };
  const changeStatusTask = (id) => {
    setCurrentTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleSearchTasks = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    if (newSearchQuery.length === 0) {
      // вернет удаленные таски
      setCurrentTasks(tasks);
    } else {
      const searchedTasks = useSearchItems(currentTasks, newSearchQuery);
      setCurrentTasks(searchedTasks);
    }
  };

  return (
    <main className={styled.main}>
      <div className={styled.header}></div>
      <div className={styled.tasksContainer}>
        <div className={styled.taskInterface}>
          <h1 className={styled.title}>{title}</h1>
          <SearchInput
            handleSearchTasks={handleSearchTasks}
            searchQuery={searchQuery}
          />
        </div>
        {currentTasks.length > 0 ? (
          <ul className={styled.tasks}>
            {currentTasks.map((task) => (
              <TaskItem
                task={task}
                deleteTask={deleteTask}
                changeStatusTask={changeStatusTask}
                key={task.id}
              />
            ))}
          </ul>
        ) : (
          <span>Список задач пуст</span>
        )}
      </div>
    </main>
  );
};

export default Main;
