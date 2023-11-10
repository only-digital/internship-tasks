import styles from "../styles/index.module.scss";
import ExampleButton from "../components/example-button/example-button";
import Top from "../components/top/top";
import Aside from "../components/aside/aside";
import {getIndexPage} from "../../lib/api";

function Index(props) {

    console.log(props)

    return (
        <main className={styles.main}>
            <Top/>

            <Aside/>
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