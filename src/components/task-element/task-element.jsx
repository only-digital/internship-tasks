import styled from './task-element.module.scss';
import Image from 'next/image';

import iconDelete from '../../../public/taskDelete.svg';

const TaskElement = ({ task, onTaskDelete, onTaskStatusChange }) => {
    const { title, text } = task;

    return (
        <div className={`${styled.TaskElement} ${task.isCompleted && styled.completed}`}>
            <Image
                className={styled.TaskElement__icon}
                src={iconDelete}
                alt="Delete task"
                onClick={() => onTaskDelete(task)}
            />
            <div onClick={() => onTaskStatusChange(task)}>
                <h2 className={styled.TaskElement__title}>
                    {title}
                </h2>
                <p className={styled.TaskElement__text}>{text}</p>
            </div>
        </div>
    )
}

export default TaskElement;