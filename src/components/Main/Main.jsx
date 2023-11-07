import { useContext } from 'react';
import { TaskContext } from '@/contexts/TaksContext';
import styled from './Main.module.scss';
import MainHead from './MainHead/MainHead';
import MainTasks from './MainTasks/MainTasks';

const Main = () => {
    const { activeTaskList } = useContext(TaskContext);
    // console.log(activeTaskList);
    return (
        activeTaskList !== undefined &&
        <div className={styled.Main}>
            <MainHead TaskListTitle={activeTaskList.title} />
            <MainTasks tasks={activeTaskList.tasks} />
        </div>
    )
}

export default Main;