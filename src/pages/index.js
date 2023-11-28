import styles from '../styles/index.module.scss'
import { getIndexPage } from "../../lib/api";
import { HeaderBar, TasksList, AsideMenu } from '@/components';
// import ExampleButton from "../components/example-button/example-button";
import tasksData from "../../data/index.json"

function Index(props) {

    // console.log(props)

    return (
        <main className={styles.main}>
            <HeaderBar />
            <div className={styles.main__content}>
                <AsideMenu tabTitle={tasksData.title} />
                <TasksList data={tasksData} />
            </div>

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