import styled from './task.module.scss';
import Image from 'next/image';
import remove from '@/assets/icons/remove.svg'


const Task = ({task, removeTask, handleCompleted}) => {

    const {title, text, isCompleted} = task;
    
    return (
        <div className={styled.Task} >
            <div className={styled.Task__wrap} >
                <h2 className={!isCompleted ? styled.Task__title : styled.Task__title_completed} onClick={() => handleCompleted(task)}>{title}</h2>
                <button onClick={() => removeTask(task)}>
                    <Image src={remove} alt='remove'/>
                </button>
            </div>
            <span className={styled.Task__text}>{text}</span>
        </div>
    )
}

export default Task;