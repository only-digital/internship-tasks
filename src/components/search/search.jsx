import styled from './search.module.scss';
import Image from 'next/image';

const Search = ({placeholder='Поиск',handleSearch}) => {
    return (
        <div className={styled.Search}>
            <input 
                className={styled.SearchInput} 
                type="text" 
                placeholder={placeholder} 
                onChange={handleSearch}/>
            <Image
                className={styled.SearchImage}
                src="/search.svg"
                width={24}
                height={24}
                alt="search"
            />
        </div>
    )
}

export default Search;