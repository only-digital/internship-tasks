import styles from '../styles/index.module.scss'
import {getIndexPage} from "../../lib/api";
import TaskList from "../components/task-list/task-list";
import {useState} from "react";
import Search from "../components/search/search";

function Index(props) {

    const {title, tasks} = props

    const [taskList, setTaskList] = useState(tasks)
    const [query, setQuery] = useState("")


    const toggleTaskHandler = (title) => {
        setTaskList(taskList.map(task => {
            return task.title === title
                ? {...task, isCompleted: !task.isCompleted}
                : {...task}
        }))
    }

    const deleteTaskHandler = (title) => {
        setTaskList(prevTasks => prevTasks.filter(task => task.title !== title))
    }

    const filterTasks = (value) => {
        const text = value.toLowerCase().trim()

        if(text === ''){
            setTaskList(tasks)
        }else{
            const filterTasks = taskList
                .filter(elem => elem.title.toLowerCase().includes(text) || elem.text.toLowerCase().includes(text))
            setTaskList(filterTasks)
        }
    }

    const onChangeSearchHandler = (value) => {
        setQuery(value)
        filterTasks(value)
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logoWrapper}>
                    <img src="/img.png" alt="logo"/>
                </div>
            </header>
            <nav className={styles.sidebar}>
                <ul>
                    <li className={styles.sidebarItem}>
                        <img src="/taskListIcon.svg" alt="Иконка задачи" />
                        {title}
                    </li>
                </ul>
            </nav>
            <main className={styles.main}>
                <div className={styles.wrapperTitle}>
                    <h1>Список задач</h1>
                    <Search value={ query} onChangeSearch = {onChangeSearchHandler}/>
                </div>
                <TaskList
                    tasks = {taskList}
                    onClickTask={toggleTaskHandler}
                    onDeleteTask = {deleteTaskHandler}
                />
            </main>
        </div>

    )
}

export const getStaticProps = async () => {
    const indexPage = await getIndexPage();

    return {
        props: indexPage,
        revalidate: 1
    };
};

export default Index;