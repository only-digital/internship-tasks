import React from "react";
import styled from "./search-field.module.scss";

const SearchField = ({ setString }) => {
  return (
    <div className={styled.field}>
      <input
        className={styled.input}
        type="text"
        placeholder="Поиск"
        onInput={(e) => {
          setString(e.target.value);
        }}
      />
      <img src="/search-icon.svg" alt="search-icon" className={styled.icon} />
    </div>
  );
};

export default SearchField;
