import styles from '../styles/index.module.scss';
import { getIndexPage } from '../../lib/api';
import LinkComponent from '@/components/link/link';
import Header from '@/components/header/header';
import Task from '@/components/task/task';
import tasksData from '../../data/index.json';
import { useState } from 'react';

function Index() {
  const [tasks, setTasks] = useState(tasksData.tasks);

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <>
      <Header />
      <div className={styles.layout}>
        <div className={styles.layout__links}>
          <LinkComponent href="/">Список задач</LinkComponent>
        </div>
        <div className={styles.layout__tasks}>
          <main className={styles.main}>
            <h1 className={styles.main__title}>{tasksData.title}</h1>
            {tasks.map((task, index) => (
              <Task
                key={index}
                title={task.title}
                text={task.text}
                onDelete={() => handleDeleteTask(index)}
              />
            ))}
          </main>
        </div>
      </div>
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
