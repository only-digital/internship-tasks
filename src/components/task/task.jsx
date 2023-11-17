import styled from './task.module.scss';
import { useState } from 'react';

import remove from '../../assets/remove.svg';

const Task = (props) => {
	const { title, text, isCompleted, index, onSetIndex } = props;
	const [taskStatus, setTaskStatus] = useState(isCompleted);

	const toggleTaskStatus = () => {	
		setTaskStatus(!taskStatus);
	}

	const handleSetIndex = (index) => {
		onSetIndex(index);
	}

    return (
		<li className={styled.task}>
			<div className={styled.task__top}>
				<h2 
					className={taskStatus ? styled.task__completed : styled.task__title} 
					onClick={() => toggleTaskStatus()}
				>
					{title}
				</h2>	
				<img 
					src={remove.src} 
					alt='Remove icon' 
					onClick={() => handleSetIndex(index)} 
				/>
			</div>

			<p className={styled.task__text}>
				{text}
			</p>
		</li>
    )
}

export default Task;