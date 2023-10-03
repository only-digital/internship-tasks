import styles from '../styles/index.module.scss'
import {getIndexPage} from "../../lib/api";

import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar';
import TodoList from '@/components/todo-list/todo-list';

function Index(props) {

    return (
		<>		
		<Header/>
			<div className={styles.container}>
				<Sidebar props={props} />
				<main className={styles.main}>
					{props ? <TodoList props={props} /> : <h1 className={styles.main__empty}>Не выбран список задач</h1>}
				</main>
		  </div>
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