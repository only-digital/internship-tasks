import styled from './logo.module.scss';

const Logo = () => {
    return (
        <a href="/" className={styled.Logo}>
            <img src="./icon/logo.svg" alt="logo" width={72} height={27} />
            <span className={styled.Logo__text}>Creative Digital Production</span>
        </a>
    )
}

export default Logo;