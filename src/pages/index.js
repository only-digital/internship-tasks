import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";
import {getIndexPage} from "../../lib/api";
import Navbar from '../components/navbar/navbar';


function Index(props) {

    console.log(props)
    const listName = props.title;
    return (
        <>
        <Navbar listName={listName}/>
        <p>{}</p>
        <main className={styles.main}>
            <ExampleButton/>

            <ExampleButton initialValue={10}/>

            {/* Your code here */}

        </main>
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