import { useState, useEffect } from "react";

const useSearch = (tasks, value) => {
  const [searchRes, setSearchRes] = useState("");

  useEffect(() => {
    const filterTask = tasks.filter(({ text, title }) => {
      const inputText = value.trim().toLowerCase();
      return (
        text.toLowerCase().includes(inputText) ||
        title.toLowerCase().includes(inputText)
      );
    });
    setSearchRes(filterTask);
  }, [value, tasks]);

  return searchRes;
};

export default useSearch;
