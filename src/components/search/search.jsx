import styled from './search.module.scss';

const Search = ({value, onChangeSearch}) => {
    return (
        <div className = {styled.Search}>
            <input
                type ='text'
                value = {value}                           
                onChange = {(e) => onChangeSearch(e.target.value)}
                placeholder='Поиск'
            />
            <img src='search.svg' alt='поиск'></img>
            
        </div>
    )
}

export default Search;