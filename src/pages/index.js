import styles from "../styles/index.module.scss";
import ExampleButton from "../components/example-button/example-button";
import { getIndexPage } from "../../lib/api";
import Header from "@/components/Header/Header";
import TaskList from "@/components/TaskList/TaskList";

function Index(props) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <TaskList tasks={props} title={"Список задач"} />
      </main>
      {/* <Footer/> */}
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
