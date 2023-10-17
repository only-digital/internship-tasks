import styles from '../styles/index.module.scss';
import Task from "../components/task/task";
import {getIndexPage} from "../../lib/api";
import { useEffect, useState } from 'react';
import tasks from '../../data/index.json';
import Header from '@/components/header/header';
import Aside from '@/components/aside/aside';
import Search from '@/components/search/search';

const Index = () => {

    const [tasksState,setTasksState] = useState(tasks);

    const handleTask = (title,typeOfClick) => {
        if (typeOfClick==='delete') {
            const newState = {
                title:tasksState.title,
                tasks:tasksState.tasks.filter((task)=>{
                    return task.title!==title
                })
            }
            setTasksState(newState);
        } else if (typeOfClick==='complete') {
            const newState = {
                title:tasksState.title,
                tasks:tasksState.tasks.map((task)=>{
                    if (task.title === title) {
                        task.isCompleted = !task.isCompleted
                        return task
                    } else return task
                })
            }
            setTasksState(newState);
        }
    }

    const handleSearch = (event) => {
        console.log(event.target.value);
    }

    return (
        <>
        <Header logoText='Creative Digital Production'/>
        <main className={styles.main}>
            <Aside logoText='Список задач'/>
            <section className={styles.tasksWrapper}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.mainTitle}>{tasksState.title}</h2>
                    <Search handleSearch={handleSearch}/>
                </div>
                <div className={styles.mainTasks}>
                    {
                        tasksState.tasks.map((task)=>{
                            return <Task key={task.title} handlerClick={handleTask} title={task.title} description={task.text} isCompleted={task.isCompleted}/>
                        })
                    }
                </div>
            </section>
        </main>
        </>
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