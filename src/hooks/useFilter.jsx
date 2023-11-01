const { useState, useEffect } = require('react');

const useFilter = (tasks, req) => {
  console.log('hook');
  const [filteredtasks, setFilteredTasks] = useState(tasks);
  useEffect(() => {
    if (req === '') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(
        tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(req.toLowerCase()) ||
            task.text.toLowerCase().includes(req.toLowerCase())
        )
      );
    }
  }, [req, tasks]);
  return filteredtasks;
};

export default useFilter;
