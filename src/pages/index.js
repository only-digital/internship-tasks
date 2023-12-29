import { useState } from "react";
import styles from "../styles/index.module.scss";
import { getIndexPage } from "../../lib/api";
import uuid from "react-uuid";

import Aside from "@/components/aside/aside";
import Brand from "@/components/brand/brand";
import Menu from "@/components/menu/menu";
import Content from "@/components/content/content";
import Header from "@/components/header/header";
import HeadBar from "@/components/head-bar/head-bar";
import Search from "@/components/search/search";
import List from "@/components/list/list";
import TaskItem from "@/components/task-item/task-item";
import { useSearch } from "@/hooks/use-search";

function Index(props) {
  const addId = (items) => items.map((task) => ({ ...task, id: uuid() }));

  const [tasks, setTasks] = useState(() => addId(props.tasks));
  const [filtered, setSearchValue] = useSearch(tasks);

  const onCompleted = (id) =>
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      })
    );

  const onRemove = (id) =>
    setTasks((prev) => prev.filter((item) => item.id !== id));

  const onSearch = (value) => setSearchValue(value);

  const renders = {
    task: (item) => {
      return (
        <TaskItem
          key={item.id}
          task={item}
          onCompleted={onCompleted}
          onRemove={onRemove}
        />
      );
    },
  };

  return (
    <main className={styles.main}>
      <Aside>
        <Brand />
        <Menu />
      </Aside>
      <Content>
        <Header />
        <HeadBar title={props.title}>
          <Search onChange={onSearch} />
        </HeadBar>
        <List list={filtered} renderItem={renders.task} />
      </Content>
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
