import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";
import {getIndexPage} from "../../lib/api";
import Tasks from '@/components/tasks/tasks';

function Index(props) {

    // console.log(props)
    return (
        <main className={styles.main}>
            {/* <ExampleButton/>
            <ExampleButton initialValue={10}/> */}

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