import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";
import {getIndexPage} from "../../lib/api";
import HeaderBar from '@/components/header-bar/header-bar';
import TasksList from '@/components/tasks-list/tasks-list';
import tasksData from '/data/index.json';
import AsideMenu from '@/components/aside-menu/aside-menu';

function Index(props) {

    console.log(props)

    return (
        <main className={styles.main}>
            <HeaderBar />
            <div className={styles.main__content}>
                <AsideMenu tabTitle={tasksData.title}/>
                <TasksList data={tasksData}/>
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