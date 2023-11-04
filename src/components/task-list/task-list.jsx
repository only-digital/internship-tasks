import styled from './task-list.module.scss';

const TaskList = ({ tasks, onClickTask, onDeleteTask }) => {
    console.log(tasks)
    
    return (
        <ul className={styled.TaskList}>
            {tasks.map( (task, idx) => (

                <li key={idx} className={styled.Task__item} onClick={() => onClickTask(task)}>
                    <div className={`${styled.Task__block} ${task.isCompleted && styled.completed}`}>
                        <h2 className={styled.Task__title}>{task.title}</h2>
                        <button className={styled.Task__deleteButton} onClick={() => onDeleteTask(task)}>
                            <img src="close.svg" />
                        </button>       
                    </div>

                    <div className={styled.Task__text}>
                        {task.text}
                    </div>
                </li>
            ))
            }
        </ul>
    )
}

export default TaskList;