const useSearch = (searchValue, tasks) => {
  if (!searchValue) {
    return tasks;
  }
  const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
  task.text.toLowerCase().includes(searchValue.toLowerCase()))

  return filteredTasks;
};

export default useSearch;
