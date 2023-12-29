import styled from './menu.module.scss';
import Image from 'next/image';

const Menu = () => {
    return (
        <div className={styled.Menu}>
            <button className={styled.Menu__button}>
                <Image src="/file.svg" width={20} height={20} alt="file"/>
                <span className={styled.Menu__text}>Список задач</span>
            </button>
        </div>
    )
}

export default Menu;