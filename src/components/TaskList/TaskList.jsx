import { useState } from "react";
import styled from "./TaskList.module.scss";
import TaskItem from "../TaskItem/TaskItem";
import SearchInput from "../SearchInput/SearchInput";
import useSearch from "../../hooks/useSearch/useSearch";

const TaskList = ({ tasks, title }) => {
  const [data, setData] = useState(tasks);

  const [search, setSearch] = useState("");

  const filteredData = useSearch(search, data);

  const handleDelete = (id) => {
    setData((prev) => prev.filter((_, index) => index !== id));
  };

  const handleChangeStatus = (id) => {
    setData((prev) =>
      prev.map((task, index) => {
        if (index === id) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          };
        }

        return task;
      })
    );
  };

  const handleSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <>
      <div className={styled.TaskList__header}>
        <h3 className={styled.TaskList__title}>{title}</h3>
        <SearchInput onChange={handleSearchChange} value={search} />
      </div>
      <div className={styled.TaskList__items}>
        {filteredData.length ? (
          <TaskItem
            tasks={filteredData}
            onChange={handleChangeStatus}
            onDelete={handleDelete}
          />
        ) : (
          "пуст..."
        )}
      </div>
    </>
  );
};

export default TaskList;
