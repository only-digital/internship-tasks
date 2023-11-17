import styles from '../styles/index.module.scss'
import {getIndexPage} from "../../lib/api";

import Sidebar from '@/components/sidebar/sidebar';
import Header from '@/components/header/header';
import Content from '@/components/content/content';

function Index(props) {
	const { title, tasks } = props;
    console.log(props)

    return (
        <main className={styles.main}>
			<Header />

			<div className={styles.container}>
				<Sidebar />
				<Content 
					title={title}
					tasks={tasks}
				/>
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