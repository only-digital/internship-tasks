import styled from "./search-input.module.scss";

const SearchInput = ({value, onChange}) => {
    return (
        <div className={styled.SearchInput}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Поиск"
            />
            <img src="search.svg" />
        </div>
    );
};

export default SearchInput;
