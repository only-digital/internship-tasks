import styled from './todoList.module.scss';
import TodoItem from '../todoItem/todoItem';
import Search from '../Search/Search';

import data from '../../../data/index.json';

const TodoList = () => {
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
                    data.tasks.map((item) => {
                        return <TodoItem 
                            title={item.title} 
                            text={item.text}
                            isCompleted={item.isCompleted}
                        />
                    })
                }
            </ul>
        </section>
    )
}

export default TodoList;