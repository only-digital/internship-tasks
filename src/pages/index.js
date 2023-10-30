import styles from "../styles/index.module.scss";
import { getIndexPage } from "../../lib/api";
import Header from "@/components/header/header";
import Aside from "@/components/aside/aside";
import TaskList from "@/components/task-list/task-list";

function Index(props) {
  console.log(props);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Aside title={props.title} />
        <TaskList title={props.title} tasks={props.tasks} />
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
