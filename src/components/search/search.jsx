import { useEffect, useState, useTransition } from "react";
import styled from "./search.module.scss";
import Image from "next/image";
import icon from "../../../public/images/search.svg";
import useSearch from "@/hooks/useSearch";

const Search = ({ tasks, setTasks }) => {
  const [search, setSearch] = useState("");
  const { filteredTask, onSearchChange } = useSearch(tasks);

  const onInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(search);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    setTasks(filteredTask);
  }, [filteredTask]);

  return (
    <div className={styled.Search}>
      <input
        className={styled.field}
        type="text"
        name="search"
        id="search"
        placeholder="Поиск"
        value={search}
        onChange={onInputChange}
      />
      <Image className={styled.icon} src={icon} alt="" width={24} height={24} />
    </div>
  );
};

export default Search;
