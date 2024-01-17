import { Fragment } from 'react';
import styles from '../styles/index.module.scss';
import Header from '../components/header/header';
import { getIndexPage } from '../../lib/api';

function Index(props) {
  console.log(props);

  return (
    <Fragment>
      <Header />
      <main className={styles.main}></main>
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
