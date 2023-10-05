import { useState } from 'react';
import AsideBlock from '../aside-block/aside-block';
import styled from './content-block.module.scss';
import TaskElement from '../task-element/task-element';
import SearchElement from '../search-element/search-element';

const ContentBlock = ({ props }) => {
    const [tasks, setTasks] = useState(props.tasks);
    const title = props.title;

    const onToggleTaskStatus = (task) => {
        setTasks(prev => prev.map((t) => t === task ? { ...t, isCompleted: !t.isCompleted } : t));
    }

    const onDeleteHandler = (deleteTask) => {
        setTasks(prev => prev.filter((task) => task !== deleteTask));
    }

    const onChangeHandler = (value) => {
        console.log(value);
    }

    return (
        <div className={styled.ContentBlock}>
            <AsideBlock />
            <div className={styled.ContentBlock__tasks}>
                <div className={styled.ContentBlock__tasks_header}>
                    <header>{title}</header>
                    <SearchElement tasks={tasks} onInputChange={onChangeHandler}/>
                </div>
                {tasks.map((task, idx) => (
                    <TaskElement
                        key={idx}
                        task={task}
                        onTaskDelete={onDeleteHandler}
                        onTaskStatusChange={onToggleTaskStatus}
                    />
                ))}
            </div>
        </div>
    )
}

export default ContentBlock;