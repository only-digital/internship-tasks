import styled from "./sidebar.module.scss";
import tasksIcon from "../../../public/images/task.svg";
import SidebarItem from "../sidebar-item/sidebar-item";

const Sidebar = () => {
  return (
    <nav className={styled.sidebar}>
      <SidebarItem image={tasksIcon} title="Список задач" />
    </nav>
  );
};

export default Sidebar;
