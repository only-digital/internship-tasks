import { Fragment } from 'react';
import styles from '../styles/index.module.scss';
import { getIndexPage } from '../../lib/api';
import Header from '../components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import TaskList from '@/components/taskList/taskList';

function Index(props) {
  const sideItems = [
    {
      id: 1,
      text: props.title,
    },
  ];

  return (
    <Fragment>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar items={sideItems} />
        <main className={styles.main}>
          <TaskList tasks={props.tasks} title={props.title}/>
        </main>
      </div>
    </Fragment>
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
