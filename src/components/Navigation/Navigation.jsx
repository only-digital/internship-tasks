import NavElement from "../NavElement/NavElement";
import styled from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <div className={styled.Navigation}>
      <NavElement iconPath={"/doc.svg"} text={"Список задач"} />
    </div>
  );
};

export default Navigation;
