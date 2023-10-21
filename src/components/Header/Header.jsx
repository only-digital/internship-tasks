import styled from './Header.module.scss';
import HeaderLogo from './HeaderLogo/HeaderLogo';

const Header = () => {
    return (
        <header className={styled.Header}>
            <HeaderLogo/>
        </header>
    )
}

export default Header;