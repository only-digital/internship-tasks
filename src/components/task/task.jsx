import styled from './task.module.scss';
import Image from 'next/image'

const Task = ({title,description,handlerClick,isCompleted}) => {
    return (
        <div className={styled.Task}>
            <div className={styled.TaskTitleWrapper}>
                <h5 
                    className={isCompleted?styled.TaskTitleCompleted:styled.TaskTitle} 
                    onPointerDown={()=>handlerClick(title,'complete')}>
                        {title}
                </h5>
                <Image
                    className={styled.TaskImage}
                    src="/cross.svg"
                    width={26}
                    height={26}
                    alt="cross"
                    onPointerDown={()=>handlerClick(title,'delete')}
                />
            </div>
            <div className={styled.TaskDelimeter}></div>
            <p  className={styled.TaskDescription} 
                onPointerDown={()=>handlerClick(title,'complete')}
            >
                {description}
            </p>
        </div>
    )
}

export default Task;