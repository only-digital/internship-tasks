import styles from '../styles/index.module.scss'
import Task from "../components/task/task";
import {getIndexPage} from "../../lib/api";

const Index = (props) => {

    const handler = (title) => {
        console.log(title)
    }

    return (
        <main className={styles.main}>
            <Task handlerCrossClick={handler} title={'Task1'} description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus purus nec erat tempus, a luctus dolor ornare. Aenean convallis magna vel turpis imperdiet, non convallis nulla consequat. '}/>

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