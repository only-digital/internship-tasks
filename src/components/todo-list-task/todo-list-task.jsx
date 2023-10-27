import styled from './todo-list-task.module.scss'

const TodoListTask = ({ item, index, tasksData, setTasksData }) => {
  const onTaskClick = (index, elem) => {
    if (elem.target.tagName != 'BUTTON') {
      setTasksData(
        tasksData.map((todo, indexTodo) => {
          if (index === indexTodo) {
            return { ...todo, isCompleted: !todo.isCompleted }
          }
          return todo
        })
      )
    }
  }
  const deleteTask = (index) => {
    const updatedTasks = tasksData.filter((_, i) => i !== index)
    setTasksData(updatedTasks)
  }
  return (
    <div
      className={styled.TodoListTask}
      onClick={(elem) => onTaskClick(index, elem)}
    >
      <div
        className={
          item.isCompleted
            ? styled.TodoListTask__title_comleted
            : styled.TodoListTask__title
        }
      >
        {item.title}
      </div>
      <button
        className={styled.TodoListTask__cross}
        onClick={() => deleteTask(index)}
      ></button>
      <div className={styled.TodoListTask__text}>{item.text}</div>
    </div>
  )
}

export default TodoListTask
