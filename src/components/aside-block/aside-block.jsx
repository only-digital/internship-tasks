import Image from 'next/image';
import styled from './aside-block.module.scss';

import taskLogo from '../../../public/taskLogo.svg';

const AsideBlock = () => {

    return (
        <div className={styled.AsideBlock}>
            <span className={styled.AsideBlock__button}>
                <Image src={taskLogo} alt="Task list" />
                Список задач
            </span>
        </div>
    )
}

export default AsideBlock;