import {useState, useEffect} from "react";
import styled from './todo-list.module.scss';
import data from '../../../data/index.json';
import useSearch from './useSearch.js'

const TodoList = () => {
  const [task, setTask] = useState(data.tasks);
  const [state, setState] = useState(task.map((e) => e.isCompleted));
  const [request, setRequest] = useState('')
  const onCompleteTask = (element, index) => {
    setState(state.map((e,i) => i === index ? e = element : e));
  }
  const onDeleteTask = (index) => {
    if (task[index] === index) {
      setTask(task.splice(index+1,1));
    }

    let item = document.querySelector(`#item-${index+1}`);
    item.remove();
  }

  //поиск

  const getSearchRequest = (event) => {
    setRequest(event.target.value)
  }

  const onSearch = useSearch(request, task, setTask);

  const onRenderSearchResult = () => {
    onSearch.onClick()
  }

  return (
      <div className={styled.TodoList}>
        <div className={styled.TodoList__header}>
          <h1 className={styled.TodoList__headerName}>{data.title}</h1>
          <input type="text" className={styled.TodoList__headerSearch} placeholder={'Поиск'} onChange={(event) => getSearchRequest(event)} value={onSearch.value}/>
          <span className={styled.TodoList__headerIcon} onClick={onRenderSearchResult}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="6.25" stroke="#007FFF" strokeWidth="1.5"/>
              <path d="M15.9058 16.021L20.1944 19.697" stroke="#007FFF" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
        </div>
        {task.map((elem, index) =>
          <div className={styled.TodoList__item} key={`key-${index}`} id={`item-${index+1}`}>
            <div className={styled.TodoList__label}>
              {state[index]
                ? <h2 className={styled.TodoList__labelNameCompleted} onClick={(event) => onCompleteTask(!state[index], index)} id={`id-${index+1}`}>{elem.title}</h2>
                : <h2 className={styled.TodoList__labelName} onClick={(event) => onCompleteTask(!state[index], index)} id={`id-${index+1}`}>{elem.title}</h2>}
              <a href="#" className={styled.TodoList__labelClose} onClick={() => onDeleteTask(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M20 6L6 20" stroke="#007FFF" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 6L20 20" stroke="#007FFF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
            <p className={styled.TodoList__description}>{elem.text}</p>
          </div>
          )}
      </div>
  )
}

export default TodoList;