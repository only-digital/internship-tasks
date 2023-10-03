import styled from './todo-item.module.scss';
import {useState} from 'react';
import Image from 'next/image';


const TodoItem = ({title, text, isCompleted, handleRemoveTask}) => {

	const [taskCompleted, setTaskCompleted] = useState(isCompleted);

	const handleCompleted = () => {
		setTaskCompleted(!taskCompleted);
	}

    return (
        <li className={styled.TodoItem}>
				<div className={styled.TodoItem__header}>
					<p className={styled.TodoItem__title} data-task-completed={taskCompleted} onClick={handleCompleted}>{title}</p>
					<button onClick={handleRemoveTask}>
					<Image src="/icons/delete.svg" alt="Delete" width={20} height={20}/>
					</button>
				</div>
				<p className={styled.TodoItem__text}>{text}</p>
        </li>
    )
}

export default TodoItem;