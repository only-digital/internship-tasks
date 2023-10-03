import TodoItem from '../todo-item/todo-item';
import styled from './todo-list.module.scss';
import {useState, useCallback, useEffect} from 'react';
import Image from 'next/image';

const TodoList = ({props}) => {

	const initialTasks = props.tasks || [];

	const [todoList, setTodoList] = useState(initialTasks);

	const [searchTasks, setSearchTasks] = useState(initialTasks);

	const [isShowSearch, setIsShowSearch] = useState(false);

	const [searchValue, setSearchValue] = useState('');


	 /** useSearch
	 * Filters the given todoList based on the searchValue.
	 *
	 * @param {Array} todoList - The list of todo items to filter.
	 * @param {string} searchValue - The value to search for in the todo items.
	 * @return {Array} The filtered todoList based on the searchValue.
	 */
	const useSearch = (todoList, searchValue) => {
		return todoList.filter((item) => {
			const lcSearchValue = searchValue.trim().toLowerCase();
			const lcItemTitle = item.title.toLowerCase();
			const lcItemText = item.text.toLowerCase();

			return lcItemTitle.includes(lcSearchValue) || lcItemText.includes(lcSearchValue);
		})
	}

	const handleRemoveTask = (taskId) => {
  		setTodoList(prevTodoList => prevTodoList.filter((item) => item.id !== taskId));
	};

	const handleInput = (e) => {
  		setSearchValue(e.target.value);
	};
	
	const handleSearch = useCallback((e) => {
		if ((e.key === 'Enter' || !e.key)) { 
			if (searchValue === '') 
			setIsShowSearch(false);
			else {
				setSearchTasks(useSearch(todoList, searchValue));
				setIsShowSearch(true);
			}
		}

	}, [todoList, searchValue]);

	useEffect(() => {
		if (isShowSearch)
			setSearchTasks(useSearch(todoList, searchValue));
	}, [todoList]);

	return (
		<div className={styled.TodoList} >
			<div className={styled.TodoList__header}>
				<h1 className={styled.TodoList__title}>{props.title}</h1>
				<div className={styled.TodoList__search}>
					<input 
					type="text" 
					placeholder='Поиск' 
					onInput={handleInput} 
					onKeyDown={handleSearch} 
					value={searchValue} 
					/>
					<button onClick={handleSearch}><Image src="/icons/search.svg" alt="Search" width={24} height={24} /></button>
				</div>
			</div>
			

			<ul className={styled.TodoList__tasks}>
				{
				isShowSearch && searchTasks.length
				? <div>
					<h1>Найденные задачи по запросу: {searchValue}</h1>
					{searchTasks.map((item) => {
									return <TodoItem
					key={item.id}
					title={item.title} 
					text={item.text} 
					isCompleted={item.isCompleted}
					handleRemoveTask={() => handleRemoveTask(item.id)}
					/>})}
					</div>
				: todoList.length
				? todoList.map((item) => <TodoItem 
					key={item.id}
					title={item.title} 
					text={item.text} 
					isCompleted={item.isCompleted}
					handleRemoveTask={() => handleRemoveTask(item.id)}
					/>) 

				: <h1 className={styled.TodoList__empty}>Задач не найдено</h1>}
			</ul>	
		</div>
	)
}

export default TodoList;