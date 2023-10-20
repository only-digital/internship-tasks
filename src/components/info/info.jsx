import styled from './info.module.scss';
import Image from 'next/image';
import only from '/public/only.png';
import page from '/public/page.png';

const Info = ({title}) => {
    return (
        <div className={styled.Info}>
            <div className={styled.Info__logo}>
                <Image className={styled.Info__logo__img} src={only}></Image>
                <div className={styled.Info__title}>Creative Digital Production</div>
            </div>
            <div className={styled.Info__menu}>
            <Image className={styled.Info__menu__img} src={page}></Image>
                <span className={styled.Info__menu__text}>{title}</span>
            </div>
        </div>
    )
}

export default Info;