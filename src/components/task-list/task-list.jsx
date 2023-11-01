import styled from './task-list.module.scss';
import TaskItem from '../task-item/task-item';
import { useEffect, useState } from 'react';
import SearchForm from '../search-form/search-form';
import useFilter from '@/hooks/useFilter';

const TaskList = ({ tasks, title }) => {
  // генерирует уникальный key/id для каждой задачи
  const generateKey = (taskName) => {
    const key = taskName + new Date().getTime();
    return key;
  };
  const [modifiedTasks, setModifiedTasks] = useState([]);
  // добавляет id для каждой задачи
  useEffect(() => {
    setModifiedTasks(
      tasks.map((task) => {
        task.id = generateKey(task.title);
        return task;
      })
    );
  }, [tasks]);
  // запрос из формы
  const [req, setReq] = useState('');
  // зук для фильтрации по запросу
  const tasksForMaping = useFilter(modifiedTasks, req);
  // функция для удаления задачи
  const deleteTask = (id) => {
    setModifiedTasks(modifiedTasks.filter((objective) => objective.id !== id));
  };
  // функция для сабмита формы
  const submit = (req) => {
    setReq(req);
  };

  return (
    <div className={styled.TaskList}>
      <h1 className={styled.title}>{title}</h1>
      <SearchForm
        placeholder="Поиск"
        submit={submit}
      />
      {tasksForMaping.map((task) => {
        return (
          <TaskItem
            deleteTask={deleteTask}
            key={task.id}
            task={task}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
