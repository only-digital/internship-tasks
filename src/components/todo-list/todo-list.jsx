import useFilteredTasks from '@/hooks/useFilteredTasks'
import TodoListTask from '../todo-list-task/todo-list-task'
import styled from './todo-list.module.scss'
import { useState, useEffect } from 'react'

const TodoList = ({ data }) => {
  const [tasksData, setTasksData] = useState(data.tasks)
  const [inputValue, setInputValue] = useState('')
  const filteredTasks = useFilteredTasks(tasksData, inputValue)
  const handleInputChange = (elem) => {
    setInputValue(elem.target.value)
  }

  return (
    <div className={styled.TodoList}>
      <div className={styled.TodoList__menu}>
        <div className={styled.TodoList__menu__item}>{data.title}</div>
      </div>
      <div className={styled.TodoList__content}>
        <div className={styled.TodoList__content__title}>{data.title}</div>
        <div className={styled.TodoList__content__search}>
          <input
            className={styled.TodoList__content__search__input}
            type="text"
            placeholder="Поиск"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className={styled.TodoList__content__search__icon}></div>
        </div>

        <div className={styled.TodoList__content__tasks}>
          {filteredTasks.map((item, index) => (
            <TodoListTask
              key={index}
              item={item}
              index={index}
              tasksData={tasksData}
              setTasksData={setTasksData}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TodoList
