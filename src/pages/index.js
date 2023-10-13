import ExampleButton from "../components/example-button/example-button";
import { getIndexPage } from "../../lib/api";
import { Header } from "../components/header/header";
import { Main } from "@/components/main/main"
import styles from "../styles/index.module.scss";

function Index(props) {
  //console.log(props)

  return (
    <>
      <Header />
      <Main props={props}/>
      
      
     {/*  <main className={styles.main}>
        <ExampleButton />
        <ExampleButton initialValue={10} />
      </main> */}
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
