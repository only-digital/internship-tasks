import { useState } from "react"

import styles from '../styles/index.module.scss'
import Header from "@/components/header/header";
import MenuLeft from "@/components/menu-left/menu-left";
import {getIndexPage} from "../../lib/api";
import TaskItem from '@/components/task-item/task-item';
import InputSearch from "@/components/input-search/input-search";
import { useTasks }  from "@/hooks/useTasks"

function Index(props) {

    // console.log(props)

    const [filter, setFilter] = useState('')
    const [tasks, setTasks] = useState(props.tasks)

    const  { searchTasks }  = useTasks(tasks, filter)
    
    const removeTask = (id) => {
        setTasks(tasks.filter((t) => t.id !== id))
    }

    const changeFilter = (e) => {
        setFilter(e.target.value)
    }

    return (
        <main className={styles.main}>
            <Header />

            <section className={styles.content}>
                <aside className={styles.content__left}>
                    <MenuLeft />
                </aside>

                <div className={styles.content__item}>
                    <div className={styles.content__head}>
                        <h1 className={styles.content__title}>{props.title}</h1>
                        <InputSearch 
                            value={filter}
                            onChange={e => changeFilter(e)}
                            placeholder="Поиск"
                         />
                    </div>

                    {searchTasks.length 
                        ? 
                        searchTasks.map((task) => (
                            <TaskItem task={task} key={task.id} remove={removeTask} />
                        ))
                         : 
                        <center className={styles.notData}>Задач нет</center>}
                </div>
            </section>

        </main>
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