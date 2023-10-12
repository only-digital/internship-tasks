import styles from "../styles/index.module.scss";
import { getIndexPage } from "../../lib/api";
import Aside from "@/components/Aside/Aside";
import Main from "@/components/Main/Main";

function Index(props) {
  const { title, tasks } = props;

  return (
    <div className={styles.container}>
      <Aside />
      <Main title={title} tasks={tasks} />
    </div>
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
