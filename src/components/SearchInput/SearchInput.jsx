import styled from "./SearchInput.module.scss";

const SearchInput = ({ onChange, value }) => {
  return (
    <input
      className={styled.SearchInput}
      value={value}
      onChange={onChange}
      placeholder="Поиск"
      type="text"
      name="search"
      id="search"
    />
  );
};

export default SearchInput;
