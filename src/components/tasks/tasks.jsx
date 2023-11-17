import styled from './tasks.module.scss';
import Task from "@/components/task/task";
import {useState} from "react";
import Image from "next/image";
import search from "@/assets/icons/search.svg";

const Tasks = (props) => {
    let tasksData = props.tasksData;
    const tasksTitle = tasksData.title;
    const [tasksList, setTasksList] = useState(tasksData.tasks);
    const [displayedTasks, setDisplayedTasks] = useState(tasksData.tasks);

    function useFilterTasks(input) {
        input = input.toUpperCase();
        let foundTasks;

        foundTasks = tasksList.filter(taskItem => {
            const title = taskItem.title.toUpperCase();
            const text = taskItem.text.toUpperCase();
            return title.includes(input) || text.includes(input)
        });

        setDisplayedTasks(foundTasks);
    }

    function deleteTask(taskIndex) {
        const updatedTasksList = tasksList.filter((_, index) => {
            return index !== taskIndex
        })
        setTasksList(updatedTasksList);
        setDisplayedTasks(updatedTasksList);
    }

    return (
        <div className={styled.Tasks}>
            <div className={styled.Tasks__bar}></div>
            <section className={styled.Tasks__tasksContainer}>
                <div className={styled.Tasks__titleWrapper}>
                    <h2 className={styled.Tasks__title}>{tasksTitle}</h2>
                    <div className={styled.Tasks__searchWrapper}>
                        <input
                            type="text"
                            placeholder="Поиск"
                            onChange={(event) => useFilterTasks(event.target.value)}/>
                        <Image src={search} alt="search"/>
                    </div>
                </div>
                <ul className={styled.Tasks__tasksList}>
                    {displayedTasks.map((task, index) => (
                        <li key={index}>
                            <Task
                                task={task} index={index}
                                onDelete={() => deleteTask(index)}/>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default Tasks;
