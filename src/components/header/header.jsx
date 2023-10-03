import styled from './header.module.scss';
import Image from 'next/image';

const Header = () => {
    return (
        <header className={styled.Header}>
			<div className={styled.Header__logo}>
            <a href="https://only.digital/" target='_blank'>
					<Image src="/icons/logo.svg" alt="logo" width={72} height={27} priority={true}/>
					 <span className={styled["Header__logo--text"]}>Creative Digital Production</span>
				</a>
			</div>
        </header>
    )
}

export default Header;