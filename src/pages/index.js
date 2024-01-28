import { Fragment } from 'react';
import styles from '../styles/index.module.scss';
import { getIndexPage } from '../../lib/api';
import Header from '../components/header/header';
import Sidebar from '@/components/sidebar/sidebar';

function Index(props) {
  const sideItems = [{
    id: 1,
    text: props.title,
  }]

  return (
    <Fragment>
      <Header />
      <Sidebar items={sideItems} />
      <main className={styles.main}>

      </main>
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
