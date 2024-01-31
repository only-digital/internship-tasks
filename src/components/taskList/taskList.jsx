import { Fragment } from 'react';
import styled from './taskList.module.scss';
import Task from '../task/task';
import InputSearch from '../inputSearch/inputSearch';

const TaskList = (props) => {
  return (
    <Fragment>
      <div className={styled.TaskList__wrapper}>
        <h2 className={styled.TaskList__title}>{props.title}</h2>
        <InputSearch />
      </div>
      <ul className={styled.TaskList}>
        {props.tasks.map((task) => {
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
