import { useState, useRef, useEffect } from 'react';
import Aside from '../aside/aside';
import TodoItem from '../todo-item/todo-item';
import styled from './todo-block.module.scss';


const TodoBlock = (props) => {


    const [delItem, setDelItem] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [listItems, setListItems] = useState([]);

    const handleTitleName = (title) => {
        setDelItem(title)
    }

    useEffect(() => {
        localStorage.setItem("dataMajor", JSON.stringify(props.data.tasks));
    }, [])

   
    useEffect(() => {
        let dataArr;
        dataArr = JSON.parse(localStorage.getItem("dataMajor"));

        if (delItem) {

            dataArr.forEach((el) => {
                if (el.title === delItem) {
                    const filteredArr = dataArr.filter((elem) => elem.title !== delItem);
                    localStorage.setItem("dataMajor", JSON.stringify(filteredArr));
                    dataArr = JSON.parse(localStorage.getItem("dataMajor"));
                }
            }
            )

        }

        if (searchValue.trim().length > 0) {
            dataArr.forEach(el => {
                let { text, title } = el;
                if (text.indexOf(searchValue.trim()) != -1 || title.indexOf(searchValue.trim()) != -1) {
                    setListItems(<li className="todo-list-li" key={Math.random()}>
                        <TodoItem item={el} titleName={handleTitleName} />
                    </li>);
                };

            });
        } else {
            setListItems(dataArr.map((el) => <li className="todo-list-li" key={Math.random()}>
                <TodoItem item={el} titleName={handleTitleName} />
            </li>));
        }
    }, [delItem, searchValue])



    let interv = useRef();
    clearInterval(interv.current);

    const search = (e) => {
        clearInterval(interv.current)
        interv.current = setInterval(() => {
            setSearchValue(e.target.value)
        }, 1000)
    }


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
                    {listItems}
                </ul>
            </div>
        </div>
    )
}

export default TodoBlock;