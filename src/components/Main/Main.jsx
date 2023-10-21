import { useContext } from 'react';
import styled from './Main.module.scss';
import { TaskContext } from '@/contexts/TaksContext';
import MainHead from './MainHead/MainHead';
import MainTasks from './MainTasks/MainTasks';

const Main = () => {
    const { selectedTaskList } = useContext(TaskContext);
    return (
        selectedTaskList !== undefined &&
        <div className={styled.Main}>
            <MainHead title={selectedTaskList.title} />
            <MainTasks tasks={selectedTaskList.tasks} />
        </div>
    )
}

export default Main;