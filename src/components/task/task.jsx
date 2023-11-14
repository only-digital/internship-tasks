import styled from './task.module.scss';
import Image from "next/image";
import cross from "@/assets/icons/cross.svg";

const Task = (props) => {
    const task = props.task;

    return (
        <div className={styled.Task}>
            <div className={styled.Task__titleWrapper}>
                <h4 className={styled.Task__taskTitle}>{task.title}</h4>
                <button className={styled.Task__deleteButton}>
                    <Image
                        src={cross}
                        alt="Delete task"
                    />
                </button>
            </div>
            <p className={styled.Task__taskText}>{task.text}</p>
        </div>
    )
}

export default Task;
