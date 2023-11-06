import styled from './header.module.scss';

const Header = () => {
    return (
        <div className={styled.Header}>
           <div className={styled.Header__block}>
            <img src='./Only.svg' alt={'Only-logo'} className={styled.Header__logo}/>
            <img src='./Creative_Digital.svg' alt={'Only-logo-dscr'} className={styled.Header__logo}/>
           </div>
        </div>
    )
}

export default Header;