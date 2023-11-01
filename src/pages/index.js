import styles from '../styles/index.module.scss';
import ExampleButton from '../components/example-button/example-button';
import HeaderLogo from '@/components/header-logo/header-logo';
import AsideItem from '@/components/aside-item/aside-item';
import TaskList from '@/components/task-list/task-list';

import { getIndexPage } from '../../lib/api';

function Index(props) {
  console.log(props);

  return (
    <main className={styles.main}>
      <div className={styles.logoContainer}>
        <HeaderLogo />
      </div>
      <div className={styles.container}></div>
      <aside className={styles.aside}>
        <AsideItem title={props.title} />
      </aside>
      <TaskList
        title={props.title}
        tasks={props.tasks}
      />
    </main>
  );
}

export const getStaticProps = async () => {
  const indexPage = await getIndexPage();

  return {
    props: indexPage,
    revalidate: 1,
  };
};

export default Index;
