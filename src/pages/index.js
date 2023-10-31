import styles from '../styles/index.module.scss'
import {getIndexPage} from "../../lib/api";

function Index(props) {

    console.log(props)

    return (
        <main className={styles.main}>

            {/* Your code here */}

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