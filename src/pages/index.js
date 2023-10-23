import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";
import {getIndexPage} from "../../lib/api";
import TodoList from '@/components/todo-list/todo-list';

function Index(props) {

    return (
        <main className={styles.main}>
            <TodoList props={props.tasks}/>
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