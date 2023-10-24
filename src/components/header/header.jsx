import styled from './header.module.scss';
import Logo from '@/components/logo/logo';

const Header = () => {
    return (
        <header className={styled.Header}>
            <div className={styled.Header__left}>
                <Logo />
            </div>
        </header>
    )
}

export default Header;