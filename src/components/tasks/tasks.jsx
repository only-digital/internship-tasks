import styled from './tasks.module.scss';
import Task from '../task/task';

const Tasks = ({tasks}) => {
    return (
        <ul className={styled.Tasks}>
            {tasks.map(task => <Task task={task} key={task.title} />)}
        </ul>
    )
}

export default Tasks;