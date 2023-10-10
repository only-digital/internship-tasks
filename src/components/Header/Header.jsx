import Image from "next/image";
import styled from "./Header.module.scss";
import logo from "../../../public/images/logo.svg";

const Header = () => {
  return (
    <header className={styled.header}>
      <div className={styled.logo}>
        <Image src={logo} alt="only logo" width={72} height={27} />
        <div className={styled.text}>Creative Digital Production</div>
      </div>
    </header>
  );
};

export default Header;
