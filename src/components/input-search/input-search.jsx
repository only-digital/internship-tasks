import React from "react"
import styled from './input-search.module.scss';

const InputSearch = React.forwardRef((props, ref) => {
    return (
        <div className={styled.InputSearch}>
            <input ref={ref} {...props} type="text" className={styled.InputSearch__input} />
            <img className={styled.InputSearch__icon} src="./icon/search.svg" alt="search" width={17} height={17} draggable="false"/>
        </div>
    )
})

export default InputSearch;