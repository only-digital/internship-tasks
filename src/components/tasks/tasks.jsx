import styled from './tasks.module.scss';
import Task from "@/components/task/task";
import {useState} from "react";

const Tasks = (props) => {
    let tasksData = props.tasksData;
    const tasksTitle = tasksData.title;
    const [tasksList, setTasksList] = useState(tasksData.tasks);

    function deleteTask(taskIndex) {
        const updatedTasksList = tasksList.filter((_, index) => {
            return index !== taskIndex
        })
        setTasksList(updatedTasksList);
    }

    return (
        <div className={styled.Tasks}>
            <div className={styled.Tasks__bar}></div>
            <section className={styled.Tasks__tasksContainer}>
                <h2 className={styled.Tasks__title}>{tasksTitle}</h2>
                <ul className={styled.Tasks__tasksList}>
                    {tasksList.map((task, index) => (
                        <li key={index}>
                            <Task task={task} index={index}
                            onDelete={() => deleteTask(index)}/>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default Tasks;
