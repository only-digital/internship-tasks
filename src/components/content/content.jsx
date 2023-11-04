import { useState, useEffect } from 'react';
import styled from './content.module.scss';
import Search from '../search/search';
import useSearch from '@/hooks/useSearch';
import TaskList from '../task-list/task-list';

const Content = ({ props }) => {
    const { title, tasks } = props;

    const [taskList, setTaskList] = useState(tasks);
    const [query, setSearchQuery] = useState("");

    useEffect(() => {       
        const filteredTasks = useSearch(tasks, query);
        console.log('Filtered tasks:', filteredTasks);
        setTaskList(filteredTasks);
    }, [query, tasks]); 

    const onChangeSearchHandler = (value) => {
        console.log('Search query:', value);
        setSearchQuery(value);        
    }

    const onToggleTaskStatus = (task) => {
        setTaskList((prev) => prev.map((currentTask) =>
            currentTask === task
                ? { ...currentTask, isCompleted: !currentTask.isCompleted }
                : currentTask
        ));
    }

    const onDeleteTask = (deletedTask) => {       
        setTaskList((prev) => prev.filter((task) => task !== deletedTask));
    }

    return (
        <>
            <div className={styled.Content}>
                <div className={styled.Content__wrapper}>
                    <h1>{title}</h1>
                    <Search value={query} onChangeSearch={onChangeSearchHandler} />
                </div>
                <TaskList
                    tasks={taskList}
                    onClickTask={onToggleTaskStatus}
                    onDeleteTask={onDeleteTask}
                />
            </div>
        </>
    )
}

export default Content;