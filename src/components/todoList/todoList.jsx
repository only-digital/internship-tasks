import styled from './todoList.module.scss';

const TodoList = () => {
    return (
        <section className={styled.TodoList}>
            <h2 className={styled.TodoList__title}>
                Список задач
            </h2>
        </section>
    )
}

export default TodoList;