import Image from "next/image";
import styled from "./sidebar-item.module.scss";
import Link from "next/link";

const SidebarItem = ({ title, image }) => {
  return (
    <Link href="" className={styled.sidebarItem}>
      <Image src={image} alt="" width={20} height={20} />
      <p className={styled.title}>{title}</p>
    </Link>
  );
};

export default SidebarItem;
