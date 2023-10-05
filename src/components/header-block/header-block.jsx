import styled from './header-block.module.scss';
import logoIcon from '../../../public/logoIcon.svg';
import logoText from '../../../public/logoText.svg';
import Image from 'next/image';

const HeaderBlock = () => {
    
    return (
        <div className={styled.HeaderBlock}>
            <div className={styled.HeaderBlock__title}>
                <Image className={styled.HeaderBlock__title_logo} src={logoIcon} alt="Logo"/>
                <Image className={styled.HeaderBlock__title_text} src={logoText} alt="Logo Text"/>
            </div>
        </div>
    )
}

export default HeaderBlock;