import styled from './sidebar.module.scss';
import Image from 'next/image';
import fileSvg from '@/assets/icons/file.svg'
import Link from 'next/link';

const Sidebar = ({title}) => {
    return (
        <div className={styled.Sidebar}>
            <Link href='#' className={styled.Sidebar__item}>
                <Image src={fileSvg} alt='file'/>
                <span className={styled.Sidebar__item__text}>{title}</span>
            </Link>
        </div>
    )
}

export default Sidebar;