import Image from "next/image";
import styled from "./Search.module.scss";
import iconSearch from "@/assets/icons/search-svg.svg";

const Search = ({ submit }) => {
  return (
    <form className={styled.Search} onSubmit={e => submit(e)}>
      <input type="text" placeholder="Поиск"></input>
      <button type="submit" className="clear-results">
        <Image src={iconSearch} alt="search" />
      </button>
    </form>
  );
};

export default Search;
