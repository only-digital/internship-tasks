import styled from './header-logo.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import onlyLogo from '../../../public/images/Only.svg';

const HeaderLogo = () => {
  return (
    <Link
      href="https://only.digital/"
      className={styled.HeaderLogo}
    >
      <Image
        priority={true}
        className={styled.image}
        width={72}
        height={27}
        alt="логотип Only"
        src={onlyLogo}
      />
      <p className={styled.name}>Creative Digital Production</p>
    </Link>
  );
};

export default HeaderLogo;
