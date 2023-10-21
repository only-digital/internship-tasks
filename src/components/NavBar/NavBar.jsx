import { useContext } from 'react';
import styled from './NavBar.module.scss';
import { TaskContext } from '@/contexts/TaksContext';
import TaskNav from './TaskNav/TaskNav';

const NavBar = () => {
    const { taskData } = useContext(TaskContext);
    return (
        <div className={styled.NavBar}>
            {
                taskData !== undefined &&
                taskData.map((task, key) =>
                    <TaskNav
                        title={task.title}
                        id={task.id}
                        key={key} />)
            }
        </div>
    )
}

export default NavBar;