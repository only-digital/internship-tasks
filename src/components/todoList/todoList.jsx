import styled from './todoList.module.scss';
import TodoItem from '../todoItem/todoItem';
import Search from '../Search/Search';

import React, {useState} from 'react';

import data from '../../../data/index.json';

const TodoList = () => {
    const [tasks, setTasks] = useState(data.tasks)
    console.log(tasks)
    return (
        <section className={styled.TodoList}>
            <div className={styled.TodoList__upContent}>
                <h2 className={styled.TodoList__title}>
                    {data.title}
                </h2>
                <Search />
            </div>
            <ul className={styled.TodoList__list}>
                {
                    tasks.map((item, i) => {
                        console.log(tasks[i].isCompleted)
                        return <TodoItem 
                            title={item.title} 
                            text={item.text}
                            isCompleted={item.isCompleted}
                            onClick={() => setTasks([...tasks.slice(0, i), { ...tasks[i], isCompleted: !tasks[i].isCompleted }, ...tasks.slice(i + 1)])}
                        />
                    })
                }
            </ul>
        </section>
    )
}

export default TodoList;