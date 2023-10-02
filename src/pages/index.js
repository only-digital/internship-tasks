import Content from "@/components/Content/Content";
import Nav from "@/components/Nav/Nav";
import cn from "@/shared/utils/cn";
import { getIndexPage } from "../../lib/api";
import styles from "../styles/index.module.scss";

function Index(props) {
  console.log(props);

  return (
    <main className={cn(styles.main, props.className)}>
      <Nav />
      <div className={styles.wrapper}>
        <div className={styles.header}></div>
        <Content title={props.title} items={props.tasks} />
      </div>
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
