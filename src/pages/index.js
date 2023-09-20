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

export default Index;