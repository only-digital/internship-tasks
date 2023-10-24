import styled from './search.module.scss';
import Image from 'next/image';
import search from '/public/search.png';

const Search = ({title, onSearch}) => {
    return (
        <div className={styled.Search}>
            <div className={styled.Search__title}>{title}</div>
            <div className={styled.Search__wrapper}>
                <div className={styled.Search__content}>
                    <input className={styled.Search__input} type="text" placeholder="Поиск" onChange={(e) => onSearch(e.target.value)}/>
                    <button className={styled.Search__btn}>
                        <Image src={search}></Image>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Search;