import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";
import {getIndexPage} from "../../lib/api";
import Navbar from '../components/navbar/navbar';
import DeleteButton from '../components/delete-button/delete-button';


function Index(props) {

    console.log(props)
    
    return (
        <div className={styles.Wrapper}>
            <Navbar listName={props.title}/>
            <div className={styles.TasksList}>
                <h1>{props.title}</h1>
                <ul>
                {props.tasks.map((task, index) => (
                    <li key={index} id={`taskcard` + index} className={styles.TaskCard + (task.isCompleted ? ' ' + styles.Completed : ' ' + styles.NotCompleted)}>
                    <h2>{task.title}</h2><DeleteButton />
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