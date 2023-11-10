import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";
import {getIndexPage} from "../../lib/api";
import Navbar from '../components/navbar/navbar';
import DeleteButton from '../components/delete-button/delete-button';
import { useState } from 'react';
import { useTasksSearch } from '../../src/hooks/useTasksSearch';
import { v4 as uuidv4 } from 'uuid';



function Index(props) {

    const [data, setData] = useState(props);
    console.log(data);
    const [searchStr, setSearchStr] = useState(false);
   
    const { filteredTasks } = useTasksSearch([...data.tasks], searchStr);
    console.log(filteredTasks);

    const handleButtonClick = (e) => {
        e.stopPropagation();
        let elemId = e.target.closest('.styles_TaskCard__uqRRn').id;
        let taskIndex = data.tasks.findIndex(item => item.id === elemId);
        console.log(data.tasks);
        console.log(elemId, taskIndex);
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
        e.stopPropagation();
        let elemId = e.target.closest('.styles_TaskCard__uqRRn').id;
        let taskIndex = data.tasks.findIndex(item => item.id === elemId);
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
    const handleInput = (e) => {
        setSearchStr(e.target.value);
    }
    
    return (
        <div className={styles.Wrapper}>
            <Navbar listName={data.title}/>
            <div className={styles.TasksList}>
                <label htmlFor='search'>
                    <input type="search" name='search' id='search' placeholder="Поиск" onInput={handleInput}/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="6.25" stroke="#007FFF" strokeWidth="1.5"/>
                        <path d="M15.9058 16.021L20.1944 19.697" stroke="#007FFF" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </label>
                
                <h1>{data.title}</h1>
                <ul>
                {filteredTasks && filteredTasks.map((task, index) => (
                    <li key={index} id={task.id} className={styles.TaskCard + (task.isCompleted ? ' ' + styles.Completed : '')} onClick={onCardClick}>
                    <h2>{task.title}</h2><DeleteButton handleButtonClick={handleButtonClick}/>
                    <hr></hr>
                    <p>{task.text}</p>
                    </li>
                ))}   
                {!filteredTasks && data.tasks.map((task, index) => (
                    <li key={index} id={task.id} className={styles.TaskCard + (task.isCompleted ? ' ' + styles.Completed : '')} onClick={onCardClick}>
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