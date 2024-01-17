import styled from './header.module.scss';
import Image from 'next/image';

const Header = () => {
  return (
    <header className={styled.Header}>
      <div className={styled.Header__logo}>
        <Image src="/logo.svg" width={72} height={27} alt="Only logo" priority={true}/>
        <p className={styled.Header__logoText}>Creative Digital Production</p>
      </div>
    </header>
  );
};

export default Header;
