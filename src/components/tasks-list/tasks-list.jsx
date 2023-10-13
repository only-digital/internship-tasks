import { useState } from 'react';
import styled from './tasks-list.module.scss';
import Task from '../task/task';
import useSearch from '@/hooks/useSearch';

const TasksList = ({ data }) => {
    const [tasks, setTasks] = useState(data.tasks);
    const [inputValue, setInputValue] = useState('');
    const searchResults = useSearch(inputValue, tasks);

    const displayedTasks = inputValue.length ? searchResults : tasks;

    return (
        <div className={styled.TasksList}>
            <div className={styled.TasksList__header}>
                <h2>{data.title}</h2>
                <input 
                    type="text"
                    placeholder='Поиск'
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
            <div className={styled.TasksList__items}>
                {displayedTasks.map((task) => (
                    <Task task={task} list={tasks} removeHandler={setTasks} key={task.title} />
                ))}
            </div>
        </div>
    )
}

export default TasksList;