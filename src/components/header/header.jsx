import styled from './header.module.scss';
import Image from 'next/image';

const Header = () => {
    return (
        <header className={styled.Header}>
            <div className={styled.Header__block}>
                <Image
                    src='/logo-icon.svg'
                    alt='logo'
                    width={72}
                    height={72}
                />
                <div className={styled.Header__text}>Creative Digital Production</div>
            </div>
        </header>
    )
}

export default Header;