import styled from './only-search-input.module.scss';
import SearchIcon from '../search-icon/search-icon';

const OnlySearchInput = (props) => {
    return (
        <div className={styled.OnlySearchInput}>
            <input type="text" 
                className={styled.OnlySearchInput__input} 
                placeholder='поиск' 
                onChange={props.onSearchTask} />
            <SearchIcon/>
        </div>
    )
}

export default OnlySearchInput;