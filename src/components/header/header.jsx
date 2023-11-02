import styled from './header.module.scss';
import Image from 'next/image';
import logo from './../../assets/icons/logo.svg'

const Header = () => {
    return (
        <div className={styled.Header}>
            <div className={styled.Header__logo}>
                <Image src={logo} alt='logo'/>
                <span className={styled.Header__logo__text}>Creative Digital Production</span>
            </div>
        </div>
    )
}

export default Header;