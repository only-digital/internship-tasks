import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";

function Index() {
    return (
        <main className={styles.main}>
            <ExampleButton/>

            <ExampleButton initialValue={10}/>

            {/* Your code here */}

        </main>
    )
}

export const getStaticProps = async () => {
    return {
        props: {
            meta: {
                title: 'Title',
                description: 'description',
                keywords: 'keywords'
            },
            header: {},
            sandwich: {}
        },
        revalidate: 1
    };
};

export default Index;