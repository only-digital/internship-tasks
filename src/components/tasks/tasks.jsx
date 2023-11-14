import styled from './tasks.module.scss';
import Task from "@/components/task/task";

const Tasks = (props) => {
    let tasksData = props.tasksData;
    const tasksTitle = tasksData.title;
    const tasksList = tasksData.tasks;

    return (
        <div className={styled.Tasks}>
            <div className={styled.Tasks__bar}></div>
            <section className={styled.Tasks__tasksContainer}>
                <h2 className={styled.Tasks__title}>{tasksTitle}</h2>
                <ul className={styled.Tasks__tasksList}>
                    {tasksList.map((task, index) => (
                        <li key={index}>
                            <Task task={task}/>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default Tasks;
