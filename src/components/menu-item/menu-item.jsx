import styled from './menu-item.module.scss';

const MenuItem = ({title, icon}) => {
    return (
        <button className={styled.button}>
           <img src={icon} alt="menu-item" /> <span className={styled.text}>{title}</span>
        </button>
    )
}

export default MenuItem;