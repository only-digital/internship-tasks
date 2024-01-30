import { Fragment } from 'react';
import styled from './taskList.module.scss';
import Task from '../task/task';

const TaskList = (props) => {
  return (
    <Fragment>
      <h2 className={styled.TaskList__title}>{props.title}</h2>
      <ul className={styled.TaskList}>
        {props.tasks.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              task={task}
              onDelete={props.onDeleteTask}
            />
          );
        })}
      </ul>
    </Fragment>  
  );
};

export default TaskList;
