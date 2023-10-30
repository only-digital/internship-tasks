const { useState, useEffect } = require("react");

const useSearch = (tasks, search) => {
  const [searchTasks, setSearchTasks] = useState(tasks);

  useEffect(() => {
    let valueSearch = search.toLowerCase();
    const filter = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(valueSearch) ||
        task.text.toLowerCase().includes(valueSearch)
    );
    setSearchTasks(filter);
  }, [tasks, search]);

  return { searchTasks };
};
export default useSearch;
