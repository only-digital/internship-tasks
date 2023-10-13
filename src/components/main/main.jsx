import { useState } from 'react'
import { SideBar } from '../side-bar/side-bar'
import { TodoList  } from '../todo-list/todo-list'
import styled from './main.module.scss'

export const Main = ({props}) => {
    const [isShowTodoList, setIsShowTodoList] = useState(true)

    return(
        <div className={styled.main}>
            <SideBar 
                isShowTodoList={isShowTodoList} 
                setIsShowTodoList={setIsShowTodoList}
            />
            <div className={styled.main__contentContainer}>
                {isShowTodoList && <TodoList todos={props} />}
            </div>
        </div>
    )

}