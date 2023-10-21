import styled from './MainHead.module.scss';
import MainSearch from './MainSearch/MainSearch';

const MainHead = ({ title }) => {
    return (
        <div className={styled.MainHead}>
            <div className={styled.MainHead__title}>
                {title}
            </div>
            <MainSearch />
        </div>
    )
}

export default MainHead;