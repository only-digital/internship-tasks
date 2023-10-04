import styled from './task-list.module.scss';

const TaskList = ({tasks,  onClickTask, onDeleteTask}) => {

    return (
        <ul className={styled.TaskList}>
            {tasks.map((task, idx) => (
                <li key={idx} className={styled.card}>
                    <div className={`${styled.cardTitle} ${task.isCompleted && styled.completed}`}>
                        <p onClick={() => onClickTask(task.title)}>{task.title}</p>
                        <button onClick={() => onDeleteTask(task.title)}>
                            <img src="/taskCloseIcon.svg" alt="Закрыть задачу"/>
                        </button>
                    </div>
                    <div className={styled.cardBody}>
                        {task.text}
                    </div>
                </li>
            ))
            }
        </ul>
    )
}

export default TaskList;