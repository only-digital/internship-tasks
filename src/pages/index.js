import styles from "../styles/index.module.scss";
import ExampleButton from "../components/example-button/example-button";
import { getIndexPage } from "../../lib/api";
import Header from "@/components/Header/Header";

function Index(props) {
  console.log(props);

  return (
    <>
      <Header />
      <main className={styles.main}>{/* Your code here */}</main>
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
