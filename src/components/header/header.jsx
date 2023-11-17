import styled from './header.module.scss';

import logo from '../../assets/logo.svg';

const Header = () => {
    return (
		<header className={styled.header}>
			<div className={styled.header__inner}>
				<img src={logo.src} alt='Only Digital logo'/>
				<span className={styled.header__logo}>CREATIVE DIGITAL PRODUCTION</span>
			</div>
		</header>
    )
}

export default Header;