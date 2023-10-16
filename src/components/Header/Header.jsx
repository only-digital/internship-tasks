import Image from "next/image";
import styled from "./Header.module.scss";
import iconLogo from "../../assets/icons/Only-svg.svg";

const Header = () => {
  return (
    <div className={styled.Header}>
      <div className={styled.logo}>
        <Image src={iconLogo} alt="logo"></Image>
        <p>
          Creative <br />
          Digital
          <br /> Production
        </p>
      </div>
    </div>
  );
};

export default Header;
