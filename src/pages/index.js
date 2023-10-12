import styles from '../styles/index.module.scss'
import {getIndexPage} from "../../lib/api";
import LinkComponent from '@/components/link/link'
import Header from '@/components/header/header';
import Task from '@/components/task/task';

function Index(props) {

    return (
        
        <>
        <Header />
        <div className={styles.layout}>
            <div className={styles.layout__links}>
                <LinkComponent href="/">Список задач</LinkComponent>
            </div>
            <div className={styles.layout__tasks}>
            <main className={styles.main}>
                <h1 className={styles.main__title}>Список задач</h1>
                <Task />
            </main>
            </div>
        </div>
        </>
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