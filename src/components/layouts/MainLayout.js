import Head from 'next/head';
import Header from '@/components/header/header';
import styles from './MainLayout.module.scss';
import LinkComponent from '../link/link';

const MainLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Стажировка - задание 6</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.layout}>
        <div className={styles.layout__links}>
          <LinkComponent href="/">Список задач</LinkComponent>
        </div>
        <div className={styles.layout__tasks}>{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
