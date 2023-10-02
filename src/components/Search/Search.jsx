import SearchIcon from '@/shared/assets/icons/search.svg';
import styled from "./Search.module.scss";

const Search = (props) => {

	const onSearch = (e) => {
		props.onSearch(e.target.value);
	};

  return (
    <label className={styled.Search}>
      <input placeholder="Поиск" onChange={onSearch} type="text" className={styled.input} />
      <button className={styled.searchBtn}>
        <SearchIcon />
      </button>
    </label>
  );
};

export default Search;
