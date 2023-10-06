import styles from '../styles/index.module.scss'
import ExampleButton from "../components/example-button/example-button";
import TodoList from "../components/todo-list/todo-list"
import {getIndexPage} from "../../lib/api";

function Index(props) {

    console.log(props)

    return (

      <main className={styles.main}>
        <div className={styles.main__block}>
          <div className={styles.main__headerLogo}>
            <a href="#" className={styles.main__headerLogoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="72" height="27" viewBox="0 0 72 27" fill="none">
                <path d="M0 10.978C0 16.9121 4.479 21.956 10.9176 21.956C17.3561 21.956 21.8352 16.9121 21.8352 10.978C21.8352 5.04396 17.3561 -2.98294e-07 10.9176 0C4.479 2.98294e-07 0 5.04396 0 10.978ZM5.45879 10.978C5.45879 7.41758 7.6983 5.04396 10.9176 5.04396C14.1369 5.04396 16.3764 7.41758 16.3764 10.978C16.3764 14.5385 14.1369 16.9121 10.9176 16.9121C7.6983 16.9121 5.45879 14.5385 5.45879 10.978Z" fill="#213C57"/>
                <path d="M24.2037 21.3626H28.9626V13.2033C28.9626 11.1264 30.2224 9.79121 31.762 9.79121C33.3017 9.79121 34.2814 10.8297 34.2814 12.6099V21.3626H39.0404V11.8681C39.0404 7.71428 36.9409 5.48901 33.5816 5.48901C30.5023 5.48901 29.2426 8.01099 29.2426 8.01099H28.9626L28.9626 5.93406H24.2037V21.3626Z" fill="#213C57"/>
                <path d="M41.6998 21.3626H49.678V17.3571H46.4587V0.593404L41.6998 0.593405V21.3626Z" fill="#213C57"/>
                <path d="M49.6835 5.93406L53.4627 21.3626L56.6819 21.3626L55.1423 27H60.0412L65.6399 5.93406L60.741 5.93406L57.9417 17.0604H57.1018L54.5824 5.93406L49.6835 5.93406Z" fill="#213C57"/>
                <path d="M66.9331 21.3626H72L72 16.2593H66.9331V21.3626Z" fill="#213C57"/>
              </svg>
            </a>
            <span className={styles.main__headerLogoText}>Creative Digital Production</span>
          </div>
          <div className={styles.main__headerLabel}></div>
          <div className={styles.main__aside}>
            <a href="#" className={styles.main__asideItem}>
              <span className={styles.main__asideIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3989 1H7.685C3.62429 1 2 2.80476 2 7.31667V12.731C2 17.2429 3.62429 19.0476 7.685 19.0476H12.5579C16.6186 19.0476 18.2429 17.2429 18.2429 12.731V7.63395H15.1889C13.9191 7.63395 12.9218 7.42842 12.2631 6.76976C11.6045 6.1111 11.3989 5.11378 11.3989 3.84395V1ZM17.6757 6.68645L12.5579 1H12.3464V3.84395C12.3464 5.06129 12.5554 5.72211 12.9331 6.09977C13.3108 6.47744 13.9716 6.68645 15.1889 6.68645H17.6757Z" fill="#007FFF"/>
                </svg>
              </span>
              <span className={styles.main__asideText}>
                Список задач
              </span>
            </a>
          </div>
          <div className={styles.main__content}>
            <TodoList/>
          </div>
        </div>
    </main>
    )
}

export const getStaticProps = async () => {
    const indexPage = await getIndexPage();

    return {
        props: indexPage,
        revalidate: 1
    };
};

export default Index;