import styled from './task.module.scss';
import Image from 'next/image'

const Task = ({title,description,handlerCrossClick}) => {
    return (
        <div className={styled.Task}>
            <div className={styled.TaskTitleWrapper}>
                <h5 className={styled.TaskTitle}>{title}</h5>
                <Image
                    className={styled.TaskImage}
                    src="/cross.svg"
                    width={26}
                    height={26}
                    alt="cross"
                    onPointerDown={()=>handlerCrossClick(title)}
                />
            </div>
            <div className={styled.TaskDelimeter}></div>
            <p className={styled.TaskDescription}>{description}</p>
        </div>
    )
}

export default Task;