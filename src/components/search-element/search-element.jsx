import styled from './search-element.module.scss';

const SearchElement = ({ onInputChange }) => {
    return (
        <div className={styled.SearchElement}>
            <input
                type='text'
                placeholder='Поиск'
                onChange={e => onInputChange(e.target.value)}
            />
        </div>
    )
}

export default SearchElement;