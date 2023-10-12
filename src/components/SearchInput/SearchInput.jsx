import styled from "./SearchInput.module.scss";

const SearchInput = ({ handleSearchTasks, searchQuery }) => {
  return (
    <div className={styled.SearchInput}>
      <input
        type="text"
        placeholder="Поиск"
        className={styled.inputSearch}
        value={searchQuery}
        onChange={handleSearchTasks}
      />
      <div className={styled.inputLoupe}>
        <img src="/icons/loupe.svg" alt="поиск" width={24} height={24} />
      </div>
    </div>
  );
};

export default SearchInput;
