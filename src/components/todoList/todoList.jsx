import styled from './todoList.module.scss';
import TodoItem from '../todoItem/todoItem';

const TodoList = () => {
    return (
        <section className={styled.TodoList}>
            <h2 className={styled.TodoList__title}>
                Список задач
            </h2>
            <ul className={styled.TodoList__list}>
                <TodoItem />
                <TodoItem />
                <TodoItem />
            </ul>
        </section>
    )
}

export default TodoList;