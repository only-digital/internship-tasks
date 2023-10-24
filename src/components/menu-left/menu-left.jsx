import styled from './menu-left.module.scss';

const MenuLeft = () => {
    return (
        <ul className={styled.MenuLeft}>
            <li>
                <a href="#" className={styled.active}>
                    <img src="./icon/task.svg" alt="file" width={20} height={20} />
                    <span className={styled.MenuLeft__text}>Список задач</span>
                </a>
            </li>
        </ul>
    )
}

export default MenuLeft;