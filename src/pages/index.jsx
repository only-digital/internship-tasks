import styles from '../styles/index.module.scss';
import Task from "../components/task/task";
import {getIndexPage} from "../../lib/api";
import { useEffect, useState } from 'react';
import tasks from '../../data/index.json';

const Index = (props) => {

    const [tasksState,setTasksState] = useState({});
    useEffect(()=>{
        setTasksState(tasks);
    },[])

    const handlerDeleteTask = (title) => {
        const newState = {
            title:tasksState.title,
            tasks:tasksState.tasks.filter((task)=>{
                return task.title!==title
            })
        }
        setTasksState(newState);
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.mainTitle}>{tasksState.title}</h1>
            <div className={styles.mainTasks}>
                {
                    tasksState.tasks.map((task)=>{
                        return <Task key={task.title} handlerCrossClick={handlerDeleteTask} title={task.title} description={task.text}/>
                    })
                }
            </div>

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