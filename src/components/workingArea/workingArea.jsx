import styled from './workingArea.module.scss';
import TodoList from '../todoList/todoList';


const WorkingArea = (props) => {
    return (
        <div className={styled.WorkingArea}>
            <TodoList tasks={props.tasks} />
        </div>
    )
}

export default WorkingArea;