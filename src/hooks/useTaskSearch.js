import { useState, useEffect } from 'react';

const useTaskSearch = (searchString, tasks) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    if (!searchString) {
      setFilteredTasks(tasks);
      return;
    }

    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchString.toLowerCase()) ||
        task.text.toLowerCase().includes(searchString.toLowerCase()),
    );

    setFilteredTasks(filtered);
  }, [searchString, tasks]);

  return filteredTasks;
};

export default useTaskSearch;
