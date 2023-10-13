import Image from 'next/image';
import styled from './aside-menu.module.scss';

const AsideMenu = ({ tabTitle }) => {
    return (
        <div className={styled.AsideMenu}>
            <div className={styled.AsideMenu__tab}>
                <Image src='/file-icon.png' width={20} height={20} alt='File icon'/>
                <span>{tabTitle}</span>
            </div>
        </div>
    )
}

export default AsideMenu;