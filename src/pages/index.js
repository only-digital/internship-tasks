import styles from "../styles/index.module.scss";
import Sidebar from "@/components/sidebar/sidebar";
import Home from "@/components/home/home";
import { getIndexPage } from "../../lib/api";
import { useState } from "react";

function Index(props) {
    const title = props.title;
    const [tasks, setTasks] = useState(props.tasks);

    const handleToggleTask = (taskId) => {
        const updatedTasks = tasks.map(task => task.title === taskId ? {...task, isCompleted: !task.isCompleted} : task)
        setTasks(updatedTasks);
    }

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.title !== taskId)
        setTasks(updatedTasks)
    }

    return (
        <main className={styles.main}>
            <Sidebar title={title} />
            <Home tasks={tasks} title={title} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} />
        </main>
    );
}

export const getStaticProps = async () => {
    const indexPage = await getIndexPage();

    return {
        props: indexPage,
        revalidate: 1,
    };
};

export default Index;
