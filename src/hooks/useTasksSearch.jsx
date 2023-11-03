import { useMemo } from 'react';

function useTaskSearch(tasks, searchString) {
  const filteredTasks = useMemo(() => {
    if (!searchString) {
      return tasks;
    }

    const lowercaseSearch = searchString.toLowerCase();
    return tasks.filter((task) => {
      const lowercaseTitle = task.title.toLowerCase();
      const lowercaseText = task.text.toLowerCase();
      return lowercaseTitle.includes(lowercaseSearch) || lowercaseText.includes(lowercaseSearch);
    });
  }, [tasks, searchString]);

  return filteredTasks;
}

export default useTaskSearch;