import styled from './sidebar-list.module.scss';
import Image from 'next/image';

const SidebarList = ({title}) => {
    return (
        <div className={styled.SidebarList} tabIndex={0}>
				<Image src="/icons/list.svg" alt="List Icon" width={20} height={20} />
            <p>{title}</p>
        </div>
    )
}

export default SidebarList;