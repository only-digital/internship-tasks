import styled from './todoList.module.scss';
import TodoItem from '../todoItem/todoItem';
import Search from '../Search/Search';

const TodoList = () => {
    return (
        <section className={styled.TodoList}>
            <div className={styled.TodoList__upContent}>
                <h2 className={styled.TodoList__title}>
                    Список задач
                </h2>
                <Search />
            </div>
            <ul className={styled.TodoList__list}>
                <TodoItem />

                <TodoItem />

                <TodoItem />
            </ul>
        </section>
    )
}

export default TodoList;