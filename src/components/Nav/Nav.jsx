import Logo1Icon from '@/shared/assets/icons/logo.svg';
import Logo2Icon from '@/shared/assets/icons/logo2.svg';
import FileIcon from '@/shared/assets/icons/file.svg';
import Image from "next/image";
import Link from "next/link";
import styled from "./Nav.module.scss";

const Nav = () => {
  return (
    <div className={styled.Nav}>
      <div className={styled.header}>
        <Logo1Icon/>
        <Logo2Icon/> 
      </div>
      <ul className={styled.list}>
				{/* 1 эл, не стал выносить в список {title, href}[] */}
        <li className={true && styled.selected}>
          <Link className={styled.item} href={"/"}>
            <FileIcon />
            <span className={styled.item__text}>Список задач</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
