import styled from './task-list.module.scss';
import TaskItem from '../task-item/task-item';
import { useState } from 'react';

const TaskList = ({ tasks, title }) => {
  const generateKey = (taskName) => {
    const key = taskName + new Date().getTime();
    return key;
  };
  const [objectives, setObjectives] = useState(
    tasks.map((task) => {
      task.id = generateKey(task.title);
      return task;
    })
  );
  const deleteTask = (id) => {
    setObjectives(objectives.filter((objective) => objective.id !== id));
  };

  return (
    <div className={styled.TaskList}>
      <h1 className={styled.title}>{title}</h1>
      {objectives.map((objective) => {
        return (
          <TaskItem
            deleteTask={deleteTask}
            key={objective.id}
            task={objective}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
