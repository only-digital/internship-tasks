import styled from './aside.module.scss';
import Image from 'next/image';

const Aside = ({logoText}) => {
    return (
        <aside className={styled.Aside}>
            <div className={styled.AsideLogo}>
                <Image
                    className={styled.AsideImage}
                    src="/folder.svg"
                    width={20}
                    height={20}
                    alt="folder"
                />
                <span className={styled.AsideText}>{logoText}</span>
            </div>
        </aside>
    )
}

export default Aside;