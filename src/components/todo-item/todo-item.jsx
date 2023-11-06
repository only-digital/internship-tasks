import { useState } from 'react';
import styled from './todo-item.module.scss';
import { useEffect } from 'react';

const TodoItem  = ({item,titleName}) => {
  
    const complited = (e) => {
        let title = e.currentTarget.firstChild.firstChild;
        title.classList.toggle('todo-item_itemOpacity__FHir0')
    }
   const closedButton = (e) => { 
             titleName(e.currentTarget.parentNode.firstChild.textContent)
    }

    const displayNone = {
        display: 'none'
    } 

    return (
        <div className={styled.TodoItem} onClick={complited}>
            <div className={styled.TodoItem__block}>
                <h3 className={!item.isComplited ? styled.TodoItem__title : `${styled.TodoItem__title} ${styled.itemOpacity}` } >
                    {item.title}
                </h3>
                <span className={styled.TodoItem__closedBtn}  onClick={closedButton}></span>
            </div>
            <p className={styled.TodoItem__text}>{item.text}</p>
        </div>
    )
}

export default TodoItem;