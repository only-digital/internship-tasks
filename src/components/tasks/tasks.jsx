import styled from './tasks.module.scss';
import Task from '../task/task';

const Tasks = ({tasks, onToggleTask, onDeleteTask}) => {
    return (
        <ul className={styled.Tasks}>
            {tasks.map(task => <Task task={task} key={task.title} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} />)}
        </ul>
    )
}

export default Tasks;