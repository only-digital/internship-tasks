import React, {useState} from 'react';
import styles from '../styles/index.module.scss'
import {getIndexPage} from "../../lib/api";
import Todolist from "../components/todolist/todolist";
import {v1} from "uuid";

function Index(props) {

    console.log("here",props)

    const [initData, changeTasks] = useState([...props.tasks]);

    initData.map((task) => {
        task.id = v1();
    })

    [initData, changeTasks] = useState();

    console.log("init",initData)

    function changeTaskStatus(id) {
        initData.map((task) => {
            if (task.id === id) {
                task.isCompleted = !task.isCompleted;
                changeTasks([...initData]);
                return;
            }
        })
        alert(initData[0].isCompleted)
    }

    return (
        <main className={styles.main}>

            <Todolist
                title={props.title}
                tasks={initData}
                changeTaskStatus={changeTaskStatus}
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