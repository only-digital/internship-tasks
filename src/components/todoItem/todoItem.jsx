import styled from './todoItem.module.scss';

const TodoItem = (props) => {
    return (
        <li 
            className={`${styled.TodoItem} ${((props.isCompleted) ? styled.TodoItem_completed : '')}`}
            id={props.id}
            onClick={props.onItemClick}
        >
            <h3 className={styled.TodoItem__title}>
                {props.title}
            </h3>
            <p className={styled.TodoItem__text}>
                {props.text}
            </p>
            <svg
                className={styled.TodoItem__svg}
                onClick={props.onButtonClick}
                    xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M20 6L6 20" stroke="#007FFF" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M6 6L20 20" stroke="#007FFF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </li>
    )
}

export default TodoItem;