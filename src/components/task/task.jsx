import styled from './task.module.scss';

import remove from '../../assets/remove.svg';

const Task = (props) => {
	const { title, text, isCompleted, index, onRemoveTask, onToggleTask } = props;

	const handleRemoveTask = (index) => {
		onRemoveTask(index);
	}

	const handleToggleTask = (index) => {
		onToggleTask(index);
	}

    return (
		<li className={styled.task}>
			<div className={styled.task__top}>
				<h2  
					className={isCompleted ? styled.task__completed : styled.task__title} 
					onClick={() => handleToggleTask(index)}
				>
					{title}
				</h2>	
				<img 
					src={remove.src} 
					alt='Remove icon' 
					onClick={() => handleRemoveTask(index)} 
				/>
			</div>

			<p className={styled.task__text}>
				{text}
			</p>
		</li>
    )
}

export default Task;