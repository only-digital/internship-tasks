import styled from './search.module.scss';

const Search = ({value, onChangeSearch}) => {
    return (
        <div className={styled.Search}>
            <input value={value} placeholder="Поиск" onChange={(e) => onChangeSearch(e.target.value)}/>
            <img src="/searchIcon.svg" alt="Поиск"/>
        </div>
    )
}

export default Search;