import styled from './sidebar.module.scss';
import SidebarItem from '../sidebarItem/sidebarItem';

const Sidebar = (props) => {
  return (
    <aside className={styled.Sidebar}>
      <ul className={styled.Sidebar__list}>
        {props.items.map((item) => (
          <SidebarItem key={item.id} id={item.id}>{item.text}</SidebarItem>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
