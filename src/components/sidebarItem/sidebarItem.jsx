import styled from './sidebarItem.module.scss';
import Image from 'next/image';

const SidebarItem = (props) => {
  return <li className={styled.SidebarItem}><Image src="/iconDoc.png" width={20} height={20} alt="Doc icon"/>{props.children}</li>;
};

export default SidebarItem;
