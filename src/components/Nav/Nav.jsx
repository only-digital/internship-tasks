import styled from "./Nav.module.scss";

const Nav = () => {
  return (
    <nav className={styled.nav}>
      <ul className={styled.navItems}>
        <li className={styled.navItem}>
          <a href="#" className={styled.navLink}>
            <img src="/icons/todos.svg" alt="задачи" width={20} height={20} />
            <span>Список задач</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
