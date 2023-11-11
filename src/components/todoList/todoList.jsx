import styled from './todoList.module.scss';

const TodoList = () => {
    return (
        <section className={styled.TodoList}>
            <h2 className={styled.TodoList__title}>
                Список задач
            </h2>
            <ul className={styled.TodoList__list}>
                
            </ul>
        </section>
    )
}

export default TodoList;