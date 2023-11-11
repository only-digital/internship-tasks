import styled from './workingArea.module.scss';
import TodoList from '../todoList/todoList';

const WorkingArea = () => {
    return (
        <div className={styled.WorkingArea}>
            <TodoList />
        </div>
    )
}

export default WorkingArea;