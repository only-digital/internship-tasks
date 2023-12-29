import styled from "./brand.module.scss";
import Image from "next/image";

const Brand = () => {
  return (
    <div className={styled.Brand}>
      <a href="/">
        <Image src="/only.svg" width={72} height={27} alt="Only" />
      </a>
      <a href="/" className={styled.Brand__nameLink}>
        <span className={styled.Brand__name}>Creative Digital Production</span>
      </a>
    </div>
  );
};

export default Brand;
