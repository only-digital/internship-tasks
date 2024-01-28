import styled from './taskList.module.scss';
import Task from '../task/task';

const TaskList = (props) => {
  return (
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
  );
};

export default TaskList;
