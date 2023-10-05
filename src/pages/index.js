import styles from '../styles/index.module.scss'
import { getIndexPage } from "../../lib/api";
import HeaderBlock from '@/components/header-block/header-block';
import ContentBlock from '@/components/content-block/content-block';

function Index(props) {
    return (
        <main className={styles.main}>
            <HeaderBlock />
            <ContentBlock props={props}/>
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