import Image from "next/image";
import styled from "./aside.module.scss";

const Aside = ({ title }) => {
  return (
    <aside className={styled.Aside}>
      <div className={styled.Aside__tasks}>
        <Image src="/file.svg" width={20} height={20} alt="Logo file" />
        <span className={styled.Aside__title}>{title}</span>
      </div>
    </aside>
  );
};

export default Aside;
