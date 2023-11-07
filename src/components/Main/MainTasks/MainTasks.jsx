import styled from './MainTasks.module.scss';
import Task from './Task/Task';

const MainTasks = ({ tasks }) => {
    return (
        <div className={styled.MainTasks}>
            {
                tasks.map((task, id) => <Task task={task} id={id} key={id} />)
            }
        </div>
    )
}

export default MainTasks;