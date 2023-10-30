import Link from "next/link";
import styled from "./header.module.scss";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styled.Header}>
      <div className={styled.Header__container}>
        <Link href="/" className={styled.Header__logo}>
          <Image src="/logo.svg" width={72} height={27} alt="Logo Only." />
          <span className={styled.Header__title}>
            Creative Digital Production
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
