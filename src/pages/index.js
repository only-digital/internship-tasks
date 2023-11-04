import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";
import {getIndexPage} from "../../lib/api";

import Aside from '@/components/aside/aside';
import Header from '@/components/header/header';
import Content from '@/components/content/content';

function Index(props) {

    

    console.log(props)

    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.container}>
                <Aside />
                <Content props={props} />
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