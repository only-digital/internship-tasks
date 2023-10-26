import styles from "../styles/index.module.scss";
import ExampleButton from "../components/example-button/example-button";
import { getIndexPage } from "../../lib/api";
import Logo from "@/components/logo/logo";

function Index(props) {
  console.log(props);

  return (
    <>
      {/* <ExampleButton />

        <ExampleButton initialValue={10} /> */}

      <header className={styles.header}>
        <Logo />
      </header>
      <aside className={styles.aside}>
        <nav className={styles.menu}></nav>
      </aside>
      <main className={styles.main}></main>
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
