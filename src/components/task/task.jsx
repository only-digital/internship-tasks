import { useState } from 'react';
import Image from 'next/image';
import styled from './task.module.scss';

export const Task = ({ task, tasks, setTasks }) => {
    const [completed, setCompleted] = useState(task.isCompleted);

    const deleteTask = () => {
        const updated_tasks = tasks.filter(item => item.id !== task.id);
        setTasks(updated_tasks);
    }

    return (
        <div className={styled.Task} onClick={() => setCompleted(!completed)}>
            <div className={completed ? styled.Task__header__completed : styled.Task__header}>
                <h5>{task.title}</h5>
                <button onClick={deleteTask}>
                    <Image src="/remove-icon.svg" width={26} height={26} alt="Delete" />
                </button>

            </div>
            <div className={styled.Task__content}>{task.text}</div>
        </div>
    )
}
