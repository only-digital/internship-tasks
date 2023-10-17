import styled from './header.module.scss';
import Image from 'next/image';

const Header = ({logoText}) => {
    return (
        <div className={styled.Header}>
            <Image
                className={styled.HeaderImage}
                src="/logo.svg"
                width={72}
                height={27}
                alt="logo"
            />
            <span className={styled.HeaderText}>{logoText}</span>
        </div>
    )
}

export default Header;