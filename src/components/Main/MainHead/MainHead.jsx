import styled from './MainHead.module.scss';
import MainSearch from './MainSearch/MainSearch';

const MainHead = ({ TaskListTitle }) => {
    return (
        <div className={styled.MainHead}>
            <div className={styled.MainHead__title}>
                {TaskListTitle}
            </div>
            <MainSearch />
        </div>
    )
}

export default MainHead;