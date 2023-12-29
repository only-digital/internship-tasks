import { useState, useEffect } from "react";

export const useSearch = (tasks) => {
  const [searchValue, setSearchValue] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (searchValue) {
      setFiltered(() =>
        tasks.filter(
          (item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.text.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFiltered([...tasks]);
    }
  }, [searchValue, tasks]);

  return [filtered, setSearchValue];
};
