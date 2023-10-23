import { useState, useEffect } from "react";

function useSearchTasks(query, tasks) {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const newFilteredTasks = tasks.filter(
      (task) =>
        task.text.toLowerCase().includes(query.toLowerCase()) ||
        task.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(newFilteredTasks);
  }, [query, tasks]); 

  return filteredTasks;
}

export default useSearchTasks;
