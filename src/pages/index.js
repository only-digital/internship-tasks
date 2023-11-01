import React, {useState, useEffect} from 'react';
import styles from '../styles/index.module.scss'
import {getIndexPage} from "../../lib/api";
import Todolist from "../components/todolist/todolist";
import { useTaskSearch } from "../hooks/useTaskSearch";
import {v1} from "uuid";

function Index(props) {


    const [initData, changeTasks] = useState([...props.tasks]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    initData.map((task,index) => {
        task.id = index;
    })

    useState([...initData])

    function changeTaskStatus(id) {
        initData[id].isCompleted = !initData[id].isCompleted;
        changeTasks([...initData]);

        alert(initData[0].isCompleted)
    }

    function deleteTask(id) {
        initData.splice(id,1);
        changeTasks([...initData]);

        const task = document.querySelectorAll('.todolist__task');
        task[id].classList.toggle('delete');
    }

    const [filteredData, searchText] = useTaskSearch(initData);

    useEffect(() => {
        if (searchPerformed) {
            console.log("Найденные значения", filteredData);
        }
    }, [filteredData, searchPerformed]);

    function taskSearch(e) {
        searchText(e);
        setSearchPerformed(true);
    }

    return (
        <main className={styles.main}>

            <Todolist
                title={props.title}
                tasks={initData}
                changeTaskStatus={changeTaskStatus}
                deleteTask={deleteTask}
                taskSearch={taskSearch}
            >

            </Todolist>

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