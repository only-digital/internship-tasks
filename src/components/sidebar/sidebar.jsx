import styled from './sidebar.module.scss';

const Sidebar = (props) => {
    const tasksTitle = props.taskData.title;

    return (
        <div className={styled.Sidebar}>
            <div className={styled.Sidebar__logoWrapper}>
                <div className={styled.Sidebar__logo}>
                    <img src="" alt=""/>
                    <p className={styled.Sidebar__logoText}>
                        Creative Digital Production
                    </p>
                </div>
            </div>
            <div className={styled.Sidebar__sidebar}>
                <div className={styled.Sidebar__frame}>
                    <div></div>
                    <p className={styled.Sidebar__sidebarText}>{tasksTitle}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
