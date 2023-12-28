import Image from 'next/image';
import styled from './task.module.scss';

export const Task = ({ task, setTasks }) => {

    const deleteTask = () =>  setTasks(prevState => prevState.filter(item => item.id !== task.id));
    
    const completedToggle = () => {

        const updated_task= {
            ...task,
            isCompleted: !task.isCompleted
        }

        setTasks(prevState => prevState.map(item => item.id === task.id ? updated_task : item));

    }
    return (
        <div className={styled.Task} onClick={completedToggle}>
            <div className={task.isCompleted ? styled.Task__header__completed : styled.Task__header}>
                <h5>{task.title}</h5>
                <button onClick={deleteTask}>
                    <Image src="/remove-icon.svg" width={26} height={26} alt="Delete" />
                </button>

            </div>
            <div className={styled.Task__content}>{task.text}</div>
        </div>
    )
}
