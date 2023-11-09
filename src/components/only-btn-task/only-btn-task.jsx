import styled from './only-btn-task.module.scss';
import FileIcon from '../file-icon/file-icon';

const OnlyBtnTask = (props) => {
    return (
        <div className={styled.OnlyBtnTask}>
            <button className={styled.OnlyBtnTask__btn}>
                <FileIcon/>
                <span className={styled.OnlyBtnTask__text}>{props.data}</span>
            </button>
        </div>
    )
}

export default OnlyBtnTask;