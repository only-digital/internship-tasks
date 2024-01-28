import styled from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styled.Header}>
      {/* <NavLink to="/" /> */}
      <div className={styled.Header__icons}>
        <img src="/Only.svg" alt="logo1" />
        <img src="/text.svg" alt="logo2" />
      </div>
    </header>
  );
};

export default Header;
