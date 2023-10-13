import styled from './search.module.scss'
import { useSearchPhrase } from "../../../../hooks/use-search-phrase"

export const Search = ({todoList, setSortTodoList}) => {
    return(
        <div className={styled.search}>
            <input
                placeholder='Поиск'
                className={styled.search__input} 
                type="text"                 
                onChange={(({target})=> {          
                    setSortTodoList(useSearchPhrase(todoList, target.value) )                 
                })}
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6.25" stroke="#007FFF" strokeWidth="1.5"/>
                <path d="M15.9058 16.021L20.1944 19.697" stroke="#007FFF" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        </div>
    )
}