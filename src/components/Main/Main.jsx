import { useContext } from 'react';
import { TaskContext } from '@/contexts/TaksContext';
import styled from './Main.module.scss';
import MainHead from './MainHead/MainHead';
import MainTasks from './MainTasks/MainTasks';

const Main = () => {
    const { filteredActiveTaskList } = useContext(TaskContext);
    ;
    return (
        filteredActiveTaskList !== undefined &&
        <div className={styled.Main}>
            <MainHead TaskListTitle={filteredActiveTaskList.title} />
            <MainTasks tasks={filteredActiveTaskList.tasks} />
        </div>
    )
}

export default Main;