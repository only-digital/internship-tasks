import { Fragment, useState } from 'react';
import styles from '../styles/index.module.scss';
import { getIndexPage } from '../../lib/api';
import Header from '../components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import TaskList from '@/components/taskList/taskList';

function Index(props) {
  const sideItems = [
    {
      id: 1,
      text: props.title,
    },
  ];

  const [tasks, setTasks] = useState(props.tasks);

  const doneTaskHandler = (taskIndex) => {
    setTasks((task, index) => {
      if (index === taskIndex) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    })
  };

  const deleteTaskHandler = (taskIndex) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((task, index) => index !== taskIndex);
      return newTasks;
    })
  }

  return (
    <Fragment>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar items={sideItems} />
        <main className={styles.main}>
          <TaskList
            tasks={tasks}
            title={props.title}
            onDoneTask={doneTaskHandler}
            onDeleteTask={deleteTaskHandler}
          />
        </main>
      </div>
    </Fragment>
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
