import { useState } from "react";
import styled from "./search.module.scss";
import Image from "next/image";

const Search = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    props.onChange(e.target.value);
  };

  return (
    <div className={styled.Search}>
      <input
        type="text"
        placeholder="Поиск"
        className={styled.Search__input}
        id={styled.Search__input}
        value={value}
        onChange={handleChange}
      />
      <Image
        src="/search.svg"
        width={24}
        height={24}
        className={styled.Search__svg}
        alt="search"
      />
    </div>
  );
};

export default Search;
