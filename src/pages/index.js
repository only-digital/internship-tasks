import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";
import {getIndexPage} from "../../lib/api";
import Navbar from '../components/navbar/navbar';
import DeleteButton from '../components/delete-button/delete-button';
import { useState } from 'react';



function Index(props) {

    const [data, setData] = useState(props);

    const handleButtonClick = (e) => {
        e.stopPropagation();
        let taskIndex = e.target.closest('.styles_TaskCard__uqRRn').id;
        // copy of the data object to avoid mutating the state directly
        let newData = { ... data };
        let newTasks = [... data.tasks];
        // delete TaskCard
        newTasks.splice(taskIndex, 1);
        newData.tasks = [ ... newTasks];
        // set data
        setData(newData);
    }

    const onCardClick = (e) => {
        console.log(e.target);
        e.stopPropagation();
        
        let taskIndex = e.target.closest('.styles_TaskCard__uqRRn').id;
        // copy of the data object to avoid mutating the state directly
        let newData = { ... data };
        let newTasks = [... data.tasks];
        // change isCompleted
        newTasks[taskIndex] = {
            ...newTasks[taskIndex], 
            isCompleted: !newTasks[taskIndex].isCompleted, 
          };
        newData.tasks = [ ... newTasks];
        // set data
        setData(newData);
    }
    
    
    return (
        <div className={styles.Wrapper}>
            <Navbar listName={data.title}/>
            <div className={styles.TasksList}>
                <h1>{data.title}</h1>
                <ul>
                {data.tasks.map((task, index) => (
                    <li key={index} id={index} className={styles.TaskCard + (task.isCompleted ? ' ' + styles.Completed : '')} onClick={onCardClick}>
                    <h2>{task.title}</h2><DeleteButton handleButtonClick={handleButtonClick}/>
                    <hr></hr>
                    <p>{task.text}</p>
                    </li>
                ))}
                </ul>
            </div>

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