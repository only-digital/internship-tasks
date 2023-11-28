import styled from './header-bar.module.scss';
import Image from 'next/image';

export const HeaderBar = () => {
    return (
        <div className={styled.HeaderBar}>
            <div className={styled.HeaderBar__logo}>
                <Image src='/only-logo.png' width={72} height={27} alt='Only logo'/>
                <span>Creative Digital Production</span>
            </div>
        </div>
    )
}
