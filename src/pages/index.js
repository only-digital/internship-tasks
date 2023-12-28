import styles from '@/styles/home.module.scss'
import { Header, TasksList, AsideMenu } from '@/components';
import { getIndexPage } from "@/lib";


function HomaPage(props) {

    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.main__content}>
                <AsideMenu />
                <TasksList tasks={props.tasks} />
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

export default HomaPage