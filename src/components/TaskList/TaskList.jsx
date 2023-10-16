import styled from "./TaskList.module.scss";
import TaskItem from "./TaskItem/TaskItem";
import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import Search from "./Search/Search";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TaskList = ({ props }) => {

  if (!props || props.length === 0) {
    return (
      <div className={styled.TaskList}>
        <h2>Задачи отсутствуют</h2>
      </div>
    );
  }
  
  const { title, tasks } = props;
  const [taskInit, setTaskInit] = useState(tasks);
  const [serchValue, setSearchValue] = useState("");
  const tasksSearch = useSearch(taskInit, serchValue);

  const removeTask = id => {
    const filterTasks = taskInit.filter(e => e.id !== id);
    setTaskInit(filterTasks);
  };

  const handleCompleted = id => {
    const isTaskCompleted = taskInit.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTaskInit(isTaskCompleted);
  };

  const submit = e => {
    e.preventDefault();
    const value = e.target[0].value;
    setSearchValue(value);
  };


  return (
    <div className={styled.TaskList}>
      <div className={styled.header}>
        <h2 className={styled.title}>{title}</h2>
        <Search submit={submit} />
      </div>
      <TransitionGroup className={styled.tasks}>
        {tasksSearch.map(task => (
          <CSSTransition key={task.id} timeout={200} classNames="anim">
            <TaskItem
              key={task.id}
              props={task}
              removeTask={removeTask}
              handleCompleted={handleCompleted}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default TaskList;
