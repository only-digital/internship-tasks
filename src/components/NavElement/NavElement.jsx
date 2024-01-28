import styled from "./NavElement.module.scss";

const NavElement = ({ iconPath, text }) => {
  return (
    <div className={styled.NavElement}>
      <img src={iconPath} alt={iconPath.split(/[./]/g)[1]} />
      <p>{text}</p>
    </div>
  );
};

export default NavElement;
