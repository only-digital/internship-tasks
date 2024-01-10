import { useState } from 'react';
import styled from './todo-item.module.scss';

const TodoItem = ({ item, onRemoveItem, keyID }) => {
    
    const [itemCompleted, setItemCompleted] = useState(item.isCompleted)

    const completed = (e) => {
        if(!itemCompleted){
            setItemCompleted(true);
        }else{
            setItemCompleted(false);
        }
    }
    const onClosedButton = () => {
        console.log(keyID)
        onRemoveItem(keyID);
    }

    return (
        <div className={styled.TodoItem} >
            <div className={styled.TodoItem__block} >
                <h3 className={!itemCompleted ? styled.TodoItem__title : `${styled.TodoItem__title} ${styled.itemOpacity}` } onClick={completed} >
                    {item.title}
                </h3>
                <span className={styled.TodoItem__closedBtn} onClick={onClosedButton}></span>
            </div>
            <p className={styled.TodoItem__text}>{item.text}</p>
        </div>
    )
}

export default TodoItem;