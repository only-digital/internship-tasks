import styled from './logo.module.scss';

const Logo = () => {
    return (
        <div className={styled.wrapper}>
            <img className={styled.icon} src="/only-icon.svg" alt="logo-icon" srcset="" />
            <span className={styled.text}>Creative Digital Production</span>
        </div>
    )
}

export default Logo;