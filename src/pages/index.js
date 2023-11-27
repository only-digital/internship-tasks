import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";
import {getIndexPage} from "../../lib/api";
import Tasks from "@/components/tasks/tasks";
import Sidebar from "@/components/sidebar/sidebar";

function Index(props) {
    const tasksData = props;

    return (
        <main className={styles.main}>
            <section className={styles.main__content}>
                <Sidebar taskData={tasksData}/>
                <Tasks tasksData={tasksData}/>
            </section>
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
