import { useState, useEffect } from 'react';
import styled from './content.module.scss';
import Search from '../search/search';
import useSearch from '@/hooks/useSearch';
import TaskList from '../task-list/task-list';

const Content = ({ props }) => {
    const { title, tasks } = props;

    const [taskList, setTaskList] = useState(tasks); // состояние с пришедшими тасками
    const [query, setSearchQuery] = useState("");

    
    const filteredTasks = useSearch(taskList, query);  // прокидываем состояние в хук
    console.log('Filtered tasks:', filteredTasks);

    const onToggleTaskStatus = (index) => {
        setTaskList((prev) =>
          prev.map((currentTask, taskIndex) =>
            taskIndex === index
              ? { ...currentTask, isCompleted: !currentTask.isCompleted }
              : currentTask
          )
        );
    };


    const onDeleteTask = (index) => {       
        setTaskList((prev) => prev.filter((__, taskIndex) => taskIndex !== index));
    }


    return (
        <>
            <div className={styled.Content}>
                <div className={styled.Content__wrapper}>
                    <h1>{title}</h1>
                    <Search value={query} onChangeSearch={setSearchQuery} /> 
                </div>
                <TaskList
                    tasks={filteredTasks}
                    onClickTask={onToggleTaskStatus}
                    onDeleteTask={onDeleteTask}
                />
            </div>
        </>
    )
}

export default Content;