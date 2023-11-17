import Task from '../task/task';
import styled from './content.module.scss';
import { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';

import search from '../../assets/search.svg';

const Content = (props) => {
	const { title, tasks } = props;
	const [tasksList, setTasksList] = useState(tasks);
	const [searchValue, setSearchValue] = useState('');
	const filteredTasksList = useSearch(searchValue, tasksList);

	const handleRemoveTask = (index) => {
		if (confirm(`Вы действительно хотите удалить пункт ${tasksList[index].title}?`)) {
			setTasksList(tasksList.filter((task, idx) => idx !== index));
		} else {
			return
		}
	}

    return (
		<section className={styled.content}>
			<div className={styled.header}>
				<h1 className={styled.header__title}>
					{ title }
				</h1>

				<div className={styled.header__search}>
					<input 
						className={styled.header__input} 
						type='text' 
						placeholder='Поиск'
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>	
					<img 
						src={search.src} 
						alt='Search icon' 
					/>
				</div>
			</div>

			<ul className={styled.tasks}>
				{
					filteredTasksList &&
					filteredTasksList.map((task, index) => (
						<Task 
							key={task.title}
							title={task.title}
							text={task.text}
							isCompleted={task.isCompleted}
							index={index}
							onSetIndex={handleRemoveTask}
						/>
					))
				}
			</ul>
	 	</section>
    )
}

export default Content;