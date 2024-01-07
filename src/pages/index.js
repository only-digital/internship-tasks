import styles from '../styles/index.module.scss'
import {getIndexPage} from "../../lib/api";
import Header from '../components/header/header';
import TodoBlock from '@/components/todo-block/todo-block';

function Index(props) {

    

    return (
        <main className={styles.main}>
            <Header />
            <TodoBlock data={props} />
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