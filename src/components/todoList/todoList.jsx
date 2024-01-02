import styled from './todoList.module.scss';
import TodoItem from '../todoItem/todoItem';
import Search from '../Search/Search';
import useSearch from '@/hooks/useSearch';

import React, { useState } from 'react';

const TodoList = (props) => {
    const modifiedTasks = props.tasks

    modifiedTasks.forEach((task, i) => {
        task.id = i
    })

    const [tasks, setTasks] = useState(modifiedTasks)

    const [todoSearch, setTodoSearch] = useState('')

    const changeSearchValue = (e) => {
        setTodoSearch(e.target.value)
    }

    const filteredTasks = useSearch(tasks, todoSearch);

    return (
        <section className={styled.TodoList}>
            <div className={styled.TodoList__upContent}>
                <h2 className={styled.TodoList__title}>
                    Список задач
                </h2>
                <Search
                    value={todoSearch}
                    onChange={changeSearchValue}
                />
            </div>
            <ul className={styled.TodoList__list}>
                {
                    filteredTasks.map((item) => (
                        <TodoItem 
                            key={item.id}
                            title={item.title} 
                            text={item.text}
                            isCompleted={item.isCompleted}
                            id={item.id}
                            onItemClick={(e) => {
                                const id = +e.target.id
                                setTasks([...tasks.slice(0, id), { ...tasks[id], isCompleted: !tasks[id].isCompleted }, ...tasks.slice(id + 1)])
                            }}
                            onButtonClick={(e) => {
                                e.stopPropagation()
                                const newFilteredTasks = tasks.filter((task) => task.id !== +e.target.parentNode.id)
                                setTasks(
                                    newFilteredTasks.map((task, i) => {
                                        return {
                                            ...task,
                                            id: i,
                                        }
                                    })
                                )
                            }}
                            
                        />
                    ))
                }
            </ul>
        </section>
    )
}

export default TodoList;
