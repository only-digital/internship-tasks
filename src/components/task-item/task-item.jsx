import styled from './task-item.module.scss';
import Image from 'next/image';
import closeBtn from '../../../public/images/close_button_image.svg';
import { useState } from 'react';

const TaskItem = ({ task, deleteTask }) => {
  const [isDone, setIsDone] = useState(task.isCompleted);
  const toggleState = () => {
    isDone ? setIsDone(false) : setIsDone(true);
  };
  const deleteItem = () => {
    deleteTask(task.id);
  };
  return (
    <div className={styled.TaskItem}>
      <h2
        onClick={toggleState}
        className={`${styled.title} ${isDone ? styled.done : ''}`}
      >
        {task.title}
      </h2>
      <button
        onClick={deleteItem}
        className={styled.deleteButton}
      >
        <Image
          src={closeBtn}
          width={26}
          height={26}
          alt="кнопка удаления задачи"
        />
      </button>
      <hr className={styled.line}></hr>
      <p className={styled.taskDescription}>{task.text}</p>
    </div>
  );
};

export default TaskItem;
