import styles from '../styles/index.module.scss'
import {getIndexPage} from "../../lib/api";
import Tasks from '@/components/tasks/tasks';

function Index(props) {
    return (
        <main className={styles.main}>
            {<Tasks {...props}/>}
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