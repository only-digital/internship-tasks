import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";
import {getIndexPage} from "../../lib/api";
import Navbar from '../components/navbar/navbar';
import DeleteButton from '../components/delete-button/delete-button';
import { useState } from 'react';


function Index(props) {
    console.log(props);
    let arr = [];
    const [isInitial, setIsInitial] = useState(Array.from({ length: props.tasks.length }, () => true))
    console.log(isInitial);
    console.log(props);

    const [myProps, setMyProps] = useState(props);

    const onCardClick = (e) => {
        if (e.target.closest('.styles_TaskCard__uqRRn').classList.contains('styles_Completed__rzorv')) {
            e.target.closest('.styles_TaskCard__uqRRn').classList.remove('styles_Completed__rzorv');
        } else {
            e.target.closest('.styles_TaskCard__uqRRn').classList.add('styles_Completed__rzorv');
        }
        
        // let cardId = e.target.closest('.styles_TaskCard__uqRRn').id;
        // let myArr = isInitial;
        // myArr[cardId] = !myArr[cardId];
        // setIsInitial(myArr);
        // console.log(isInitial);
    }
    
    return (
        <div className={styles.Wrapper}>
            <Navbar listName={props.title}/>
            <div className={styles.TasksList}>
                <h1>{props.title}</h1>
                <ul>
                {props.tasks.map((task, index) => (
                    <li key={index} id={index} className={styles.TaskCard + (task.isCompleted ? ' ' + styles.Completed : '')} onClick={onCardClick}>
                    <h2>{task.title}</h2><DeleteButton props={props}/>
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