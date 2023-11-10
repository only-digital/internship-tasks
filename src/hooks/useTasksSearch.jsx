import { useMemo, useState } from 'react';

export const useTasksSearch = (tasks, searchString) => {
  
  const filteredTasks = useMemo(() => {
    if (!searchString) {
      return null;
    } else {
      const lowercaseSearch = searchString.toLowerCase();
      const filtered = tasks.filter((task) => {
        const lowercaseTitle = task.title.toLowerCase();
        const lowercaseText = task.text.toLowerCase();
        return lowercaseTitle.includes(lowercaseSearch) || lowercaseText.includes(lowercaseSearch);
      });
      return filtered;
    }
  }, [tasks, searchString]);

  return { filteredTasks };
};








