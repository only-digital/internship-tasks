import { useState } from 'react';
import styled from './tasks-list.module.scss';
import { Task } from '../task/task';
import { useSearch } from '@/hooks';

export const TasksList = ({ data }) => {

    const [tasks, setTasks] = useState(data.tasks);
    const [inputValue, setInputValue] = useState('');
    const searchResults = useSearch(inputValue, tasks);
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
                {searchResults.map((item, index) => (
                    <Task
                        task={item}
                        list={tasks}
                        removeHandler={setTasks}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}
