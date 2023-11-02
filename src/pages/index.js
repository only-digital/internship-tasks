import styles from "../styles/index.module.scss";
import { getIndexPage } from "../../lib/api";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import TasksList from "@/components/tasks-list/tasks-list";

function Index(props) {
  console.log(props);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Sidebar title={props.title} />
        <TasksList {...props} />
      </main>
    </>
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
