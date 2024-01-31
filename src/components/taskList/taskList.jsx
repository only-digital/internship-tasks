import { Fragment, useState } from 'react';
import styled from './taskList.module.scss';
import Task from '../task/task';
import InputSearch from '../inputSearch/inputSearch';
import useSearch from '../../components/hooks/use-search';

const TaskList = (props) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
  }

  const filteredTasks = useSearch(searchValue, props.tasks);
  const tasks = filteredTasks.length > 0 ? filteredTasks : props.tasks;

  return (
    <Fragment>
      <div className={styled.TaskList__wrapper}>
        <h2 className={styled.TaskList__title}>{props.title}</h2>
        <InputSearch onSearch={handleSearch}/>
      </div>
      <ul className={styled.TaskList}>
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              task={task}
              onDelete={props.onDeleteTask}
              onDone={props.onDoneTask}
            />
          );
        })}
      </ul>
    </Fragment>
  );
};

export default TaskList;
