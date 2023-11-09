import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";
import OnlyTasksKeeper from '../components/only-tasks-keeper/only-tasks-keeper';
import {getIndexPage} from "../../lib/api";

function Index(props) {
    return (
        <main className={styles.main}>
            <OnlyTasksKeeper data={props}/>
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