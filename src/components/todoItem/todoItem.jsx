import styled from './todoItem.module.scss';

const TodoItem = (props) => {
    return (
        <li 
            className={`${styled.TodoItem} ${((props.isCompleted) ? styled.TodoItem_completed : '')}`}
            onClick={props.onClick}
        >
            <h3 className={styled.TodoItem__title}>
                {props.title}
            </h3>
            <p className={styled.TodoItem__text}>
                {props.text}
            </p>
            <svg className={styled.TodoItem__svg} xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M20 6L6 20" stroke="#007FFF" stroke-width="2" stroke-linecap="round"/>
                <path d="M6 6L20 20" stroke="#007FFF" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </li>
    )
}

export default TodoItem;