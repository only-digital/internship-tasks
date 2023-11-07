import { useContext } from 'react';
import { TaskContext } from '@/contexts/TaksContext';
import styled from './NavBar.module.scss';
import TaskNav from './TaskNav/TaskNav';

const NavBar = () => {
    const { AllTasksList } = useContext(TaskContext);
    return (
        <div className={styled.NavBar}>
            {
                AllTasksList !== undefined &&
                AllTasksList.map((tasksList, key) =>
                    <TaskNav
                        TasksListTitle={tasksList.title}
                        TasksListId={tasksList.id}
                        key={key}
                    />
                )
            }
        </div>
    )
}

export default NavBar;