import MainLayout from '@/components/layouts/MainLayout';
import styles from '../styles/index.module.scss';
import { getIndexPage } from '../../lib/api';
import Image from 'next/image';
import LinkComponent from '@/components/link/link';
import Task from '@/components/task/task';
import tasksData from '../../data/index.json';
import useTaskSearch from '../hooks/useTaskSearch';

import { useState } from 'react';

function Index() {
  const [tasks, setTasks] = useState(tasksData.tasks);
  const [searchString, setSearchString] = useState('');

  const filteredTasks = useTaskSearch(searchString, tasks);

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <MainLayout>
      <main className={styles.main}>
        <div className={styles.main__header}>
          <h1 className={styles.main__title}>{tasksData.title}</h1>
          <div className={styles.main__search}>
            <input
              type="text"
              placeholder="Поиск"
              value={searchString}
              onChange={handleSearchChange}
            />
            {searchString === '' ? (
              <Image src={require('../../public/assets/icons/search.svg')} alt="Поиск" />
            ) : (
              <Image
                style={{ cursor: 'pointer' }}
                src={require('../../public/assets/icons/close.svg')}
                alt="Поиск"
                onClick={() => setSearchString('')}
              />
            )}
          </div>
        </div>
        {filteredTasks.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            text={task.text}
            onDelete={() => handleDeleteTask(index)}
          />
        ))}
      </main>
    </MainLayout>
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
