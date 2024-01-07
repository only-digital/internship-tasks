import React, { useState, useRef, useMemo } from 'react';
import Aside from '../aside/aside';
import TodoItem from '../todo-item/todo-item';
import styled from './todo-block.module.scss';
import { useSearch } from '@/hooks/useSearch';

const TodoBlock = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [listItems, setListItems] = useState(props.data.tasks);
   
    const handleDeleteItem = (title) => {
        setListItems((prevList) => prevList.filter((item) => item.title !== title));
    };

    const filteredList = useMemo(() => {
        if (searchValue.trim().length > 0) {
            const searchFunc = useSearch(listItems, searchValue);
            return searchFunc;
        } else {
            return listItems;
        }
    }, [listItems, searchValue]);

    let interv = useRef();
    const search = (e) => {
        clearInterval(interv.current);
        interv.current = setInterval(() => {
            setSearchValue(e.target.value);
        }, 1000);
    };

    return (
        <div className={styled.TodoBlock}>
            <aside>
                <Aside />
            </aside>
            <div className={styled.TodoBlock__listContainer}>
                <div className={styled.TodoBlock__searchContainer}>
                    <h2 className={styled.TodoBlock__listTitle}>Список задач</h2>
                    <input type="text" placeholder='Поиск' className={styled.TodoBlock__listInpt} onChange={search} />
                </div>
                <ul className={styled.TodoList}>
                    {filteredList.map((el) => (
                        <li className="todo-list-li" key={el.title}>
                            <TodoItem item={el} titleName={handleDeleteItem} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoBlock;