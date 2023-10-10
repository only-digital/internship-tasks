const { useState, useEffect } = require("react");

export default function useSearch(inputTasks) {
  const [filteredTask, setTasks] = useState(inputTasks);

  const onSearchChange = (search) => {
    const matchedTasks = inputTasks.filter(
      (task) => task.title.includes(search) || task.text.includes(search)
    );
    setTasks(matchedTasks);
  };

  return { filteredTask, onSearchChange };
}
