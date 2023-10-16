import styles from "../styles/index.module.scss";
import { getIndexPage } from "../../lib/api";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import TaskList from "@/components/TaskList/TaskList";

function Index(props) {

  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.wrapper}>
        <Sidebar />
        <TaskList props={props} />
      </section>
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
