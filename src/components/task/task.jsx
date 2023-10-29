import styled from './task.module.scss';

const Task = ({task}) => {
    return (
        <li className={styled.Task}>
            <label>
                <input type="checkbox" className={styled.Task__input} checked={task.isCompleted} />
                <div className={styled.Task__body}>
                    <h1 className={styled.Task__body__title}>{task.title}</h1>
                    <div className={styled.Task__body__divider} />
                    <p className={styled.Task__body__text}>{task.text}</p>
                </div>
            </label>
            <button className={styled.Task__deleteButton}>
                <img src="delete.svg" />
            </button>
        </li>
    )
}

export default Task;