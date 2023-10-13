import { useState } from "react";
import styled from './todo.module.scss'

export const Todo = ({title, text, complit, setTodolist, id, sortTodoList}) => {   
  
    return (
        <div className={styled.todo}>
            <div 
                className={styled.todo__close}
                onClick={()=>{
                sortTodoList.splice(id, 1)
                setTodolist([sortTodoList])               
                }}>
                    ✕
            </div>
            <div 
                className={styled.todo__todoArea}
                onClick={()=> setTodolist([
                    sortTodoList, 
                    sortTodoList[id].isCompleted = !complit
                    ])}>                         
                <div 
                    className={complit ? styled.todo__todoArea__title : styled.todo__todoComplited}>
                    {title}
                </div>              
                <div className={styled.todo__todoArea__text}>{text}</div>
            </div>    
        </div>
    )
    
}