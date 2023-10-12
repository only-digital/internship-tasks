import Nav from "../Nav/Nav";
import styled from "./Aside.module.scss";

const Aside = () => {
  return (
    <aside className={styled.aside}>
      <div className={styled.header}>
        <div className={styled.logoContainer}>
          <img src="/icons/logo.svg" alt="логотип" width={72} height={27} />
          <div className={styled.logoText}>
            <span>Creative</span>
            <span>Digital</span>
            <span>Production</span>
          </div>
        </div>
      </div>
     <Nav />
    </aside>
  );
};

export default Aside;
