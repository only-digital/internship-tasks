import styled from './sidebar.module.scss';
import Image from 'next/image';
import logo from './../../assets/icons/logo.svg'
import bookIcon from './../../assets/icons/bookIcon.svg'

const Sidebar = (props) => {
    const tasksTitle = props.taskData.title;

    return (
        <div className={styled.Sidebar}>
            <div className={styled.Sidebar__logoWrapper}>
                <div className={styled.Sidebar__logo}>
                    <Image src={logo} alt="Logo"/>
                    <p className={styled.Sidebar__logoText}>
                        Creative Digital Production
                    </p>
                </div>
            </div>
            <div className={styled.Sidebar__sidebar}>
                <div className={styled.Sidebar__frame}>
                    <Image src={bookIcon} alt="BookIcon"/>
                    <p className={styled.Sidebar__sidebarText}>{tasksTitle}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
