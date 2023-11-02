import Image from 'next/image';
import search from '@/assets/icons/search.svg'
import styled from './search.module.scss';




const Search = ({value, onChange}) => {


    return (
        <div className={styled.Search}>
            <input 
                className={styled.Search__input} 
                type="text" 
                placeholder='Поиск'
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                />
            <Image 
                className={styled.Search__svg} 
                alt='search' 
                src={search} 
                width={24} 
                height={24}/>
        </div>
    )
}

export default Search;