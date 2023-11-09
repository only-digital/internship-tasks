import styled from './only-task.module.scss';
import CrossIcon from '../cross-icon/cross-icon';

const OnlyTask = (props) => {
    const eventClick=()=>{
        props.onStatus(props.index);
    }

    const classes = `${styled.OnlyTask} ${props.data.isCompleted?styled.OnlyTask_completed:''}`;
    return (
        <div className={classes} onClick={eventClick}>
            <div className={styled.OnlyTask__header}>
                <span className={styled.OnlyTask__text}>{props.data.title}</span>
                <CrossIcon index={props.index} onDelete={props.onDelete}/>
            </div>
            <div className={styled.OnlyTask__content}>{props.data.text}</div>
        </div>
    )
}

export default OnlyTask;