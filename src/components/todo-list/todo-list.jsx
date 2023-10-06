import {useState} from "react";
import styled from './todo-list.module.scss';
import data from '../../../data/index.json';

const TodoList = () => {
  const [state, setState] = useState(data.tasks.map((e) => e.isCompleted))
  console.log(state)

  const [task, setTask] = useState(data.tasks)
  console.log(task)

  const onCompleteTask = (element, index) => {
    setState(state.map((e,i) => i === index ? e = element : e));
    console.log(`edited ${state}`)
  }

  const onDeleteTask = (index) => {
    if (task[index] === index) {
      setTask(task.splice(index+1,1))
    }

    let item = document.querySelector(`#item-${index+1}`)
    item.remove()
  }

  return (
      <div className={styled.TodoList}>
        <h1 className={styled.TodoList__header}>{task.title}</h1>
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




          {/* Your code here */}
      </div>
  )
}

export default TodoList;