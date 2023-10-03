import SidebarList from '../sidebar-list/sidebar-list';
import styled from './sidebar.module.scss';

const Sidebar = ({props}) => {
    return (
        <aside className={styled.Sidebar}>
            <SidebarList title={props.title} />
        </aside>
    )
}

export default Sidebar;