import styles from '../styles/index.module.scss'
import {getIndexPage} from "../../lib/api";
import Todolist from "../components/todolist/todolist";

function Index(props) {

    console.log("here",props)

    let initData = [...props.tasks]
    console.log("init",initData)

    return (
        <main className={styles.main}>

            <Todolist
                data={props}
            >

            </Todolist>

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