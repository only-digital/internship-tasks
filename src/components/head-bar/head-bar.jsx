import styled from './head-bar.module.scss';

const HeadBar = ({title, children}) => {
    return (
        <div className={styled.HeadBar}>
            <h2 className={styled.HeadBar__title}>{title}</h2>
            {children}
        </div>
    )
}

export default HeadBar;