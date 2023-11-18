import styled from './search.module.scss';

const Search = (props) => {
    return (
        <div className={styled.Search}>
            <input 
                className={styled.Search__input} 
                type='text'
                placeholder='Поиск'
                onChange={props.onChange}
                value={props.value}
            />
            <svg className={styled.Search__svg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6.25" stroke="#007FFF" strokeWidth="1.5"/>
                <path d="M15.9058 16.021L20.1944 19.697" stroke="#007FFF" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        </div>
    )
}

export default Search;