import Image from "next/image";
import styled from "./input-search.module.scss";

const InputSearch = ({ search, setSearch }) => {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div className={styled.InputSearch}>
      <input
        className={styled.InputSearch__input}
        type="search"
        placeholder="Поиск"
        value={search}
        onChange={handleChange}
      />
      <Image
        className={styled.InputSearch__icon}
        src="/search.svg"
        width={24}
        height={24}
        alt="search"
      />
    </div>
  );
};

export default InputSearch;
