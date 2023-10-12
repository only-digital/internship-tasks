import styles from './task.module.scss';
import Image from 'next/image';
import { useState } from 'react';

const Task = ({ title, text, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleDeleteTask = (event) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <div className={styles.task} onClick={() => setIsCompleted(!isCompleted)}>
      <div className={styles.task__header}>
        <h3 className={`${styles.task__title} ${isCompleted ? styles.task__title_completed : ''}`}>
          {title}
        </h3>
        <button className={styles.task__delete} onClick={handleDeleteTask}>
          <Image src={require('../../../public/assets/icons/close.svg')} alt="Удалить" />
        </button>
      </div>
      <div className={styles.task__text}>{text}</div>
    </div>
  );
};

export default Task;
