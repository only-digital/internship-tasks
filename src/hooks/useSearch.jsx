const { useState, useEffect } = require("react");

export default function useSearch(inputTasks) {
  const [filteredTask, setTasks] = useState(inputTasks);

  const onSearchChange = (search) => {
    if (inputTasks) {
      const lowerSearch = search.toLowerCase();
      const matchedTasks = inputTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(lowerSearch) ||
          task.text.toLowerCase().includes(lowerSearch)
      );
      setTasks(matchedTasks);
    }
  };

  return { filteredTask, onSearchChange };
}
