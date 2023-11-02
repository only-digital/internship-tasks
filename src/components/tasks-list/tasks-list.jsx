import useSearch from '@/hooks/useSearch';
import { useState } from 'react';
import Task from '../task/task';
import styled from './tasks-list.module.scss';
import Search from '../search/search';




const TasksList = (props) => {
    const [tasks, setTasks] = useState(props.tasks);
    const [value, setValue] = useState('');

    const SearchList = useSearch(tasks, value)

    const removeTask = (task) => {
        const res = tasks.filter((t) => t !== task);

        setTasks(res)
  };

    const handleCompleted = (task) => {
        const res = tasks.map(item => 
            task === item ? {...item, isCompleted: !item.isCompleted} : item)

        setTasks(res)
    }
    
    return (
        <div className={styled.TasksList}>
            <div className={styled.TasksList__wrapper}>
                <h2 className={styled.TasksList__title}>{props.title}</h2>
                <Search value={value} onChange={(value) => setValue(value)}/> 
            </div>
            {
                SearchList.length
                ? SearchList.map((task, index) => 
                    <Task 
                        removeTask={removeTask} 
                        task={task} 
                        key={index}
                        handleCompleted={handleCompleted}
                        />)
                : <h2>Задачи не найдены</h2>
            }
        </div>
    )
}

export default TasksList;