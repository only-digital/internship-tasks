import styled from './task.module.scss';
import Image from 'next/image';

const Task = (props) => {
  const doneHandler = () => {
    props.onDone(props.id);
  };

  const deleteHandler = (evt) => {
    evt.stopPropagation();
    props.onDelete(props.id);
  };

  const doneClass = props.task.isCompleted
    ? `${styled.Task__title} ${styled.Task__completed}`
    : styled.Task__title;

  return (
    <li className={styled.Task} onClick={doneHandler}>
      <h3 className={doneClass}>{props.task.title}</h3>
      <p className={styled.Task__text}>{props.task.text}</p>
      <button className={styled.Task__button} onClick={deleteHandler}>
        <Image
          src="/cross.svg"
          width={26}
          height={26}
          alt="Кнопка удаления задачи"
          priority={true}
        />
      </button>
    </li>
  );
};

export default Task;
