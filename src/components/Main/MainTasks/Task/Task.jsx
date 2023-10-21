import { useContext } from 'react';
import { TaskContext } from '@/contexts/TaksContext';
import styled from './Task.module.scss';
import PlusIconSvg from '@/asserts/svg/PlusIconSvg';

const Task = ({ task, id }) => {
    const { deleteTask, toggleTaskComplet } = useContext(TaskContext);
    return (
        <div className={styled.Task}>
            <div className={styled.Task__head}>
                <div
                    className={
                        `${styled.Task__title
                        } ${
                            task.isCompleted && styled.Task__title_complete
                        }`
                    }
                    onClick={() => toggleTaskComplet(id)}
                >
                    {task.title}
                </div>
                <button
                    className={styled.Task__delete}
                    onClick={() => deleteTask(id)}
                >
                    <PlusIconSvg className={styled.Task__icon} />
                </button>
            </div>
            <div className={styled.Task__text}>
                {task.text}
            </div>
        </div>
    )
}

export default Task;