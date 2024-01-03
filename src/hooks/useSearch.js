import {useEffect, useState} from 'react';

function useSearch(tasks, searchText) {
  const [filteredTasks, setFilteredTasks] = useState(tasks)

  useEffect(() => {
    if (!searchText) {
      setFilteredTasks(tasks)
      return
    }
    
    const filteredItems = tasks.filter(task =>
      task.title.toLowerCase().includes(searchText.toLowerCase()) ||
      task.text.toLowerCase().includes(searchText.toLowerCase())
    )

    setFilteredTasks(filteredItems)
  }, [searchText, tasks])

  return filteredTasks
}

export default useSearch