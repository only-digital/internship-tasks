import { useState } from 'react';
import styled from './tasks-list.module.scss';
import { Task } from '../task/task';
import { useSearch } from '@/hooks';

/*
type Task = {
    id:number
    title: string
    text: string
    isCompleted: boolean    
    }
*/

export const TasksList = (props) => {
    const [tasks, setTasks] = useState(props.tasks);
    const [query, setQuery] = useState('');
    const { results } = useSearch({ query, tasks });

    return (
        <div className={styled.TasksList}>
            <div className={styled.TasksList__header}>
                <h2>Список задач</h2>
                <input
                    value={query}
                    type="text"
                    placeholder='Поиск'
                    onChange={e => setQuery(e.target.value)}
                />
            </div>
            <div className={styled.TasksList__items}>
                {results.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        setTasks={setTasks}
                    />
                ))}
            </div>
        </div>
    )
}
