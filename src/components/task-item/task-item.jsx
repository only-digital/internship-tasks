import { useState } from "react"

import BtnClose from '@/components/btn-close/btn-close';
import styled from './task-item.module.scss';

const TaskItem = (props) => {
    const [completed, setCompleted] = useState(props.task.isCompleted)

    const toggle = () => setCompleted(!completed)

    return (
        <div className={`${styled.TaskItem} ${completed && styled.completed}`}>
            <div className={styled.TaskItem__head}>
                <h4 className={styled.TaskItem__title} onClick={() => toggle()}>
                    {props.task.title}
                </h4>
                <BtnClose onClick={() => props.remove(props.task.id)} />
            </div>
            <div className={styled.TaskItem__text}>{props.task.text}</div>
        </div>
    )
}

export default TaskItem;