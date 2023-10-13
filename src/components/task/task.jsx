import { useState } from 'react';
import Image from 'next/image';
import styled from './task.module.scss';

const Task = ({ task, list, removeHandler }) => {
    const [completed, setCompleted] = useState(task.isCompleted);

    const handleRemoveTask = () => {
        const filteredTasks = list.filter(({ title }) => title !== task.title);
        removeHandler(filteredTasks);
    }
    
    return (
        <div className={styled.Task} onClick={() => setCompleted(!completed)}>
            <div className={!completed ? styled.Task__header : [styled.Task__header, styled.Task__header_completed].join(' ')}>
                <h5>{task.title}</h5>
                <button onClick={handleRemoveTask}>
                    <Image src="/remove-icon.svg" width={26} height={26} alt="Remove cross icon" />
                </button>
                
            </div>
            <div className={styled.Task__content}>{task.text}</div>
        </div>
    )
}

export default Task;