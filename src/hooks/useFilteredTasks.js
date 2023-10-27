import { useState, useEffect } from 'react'

function useFilteredTasks(tasks, searchString) {
  const [filteredTasks, setFilteredTasks] = useState([])

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      return (
        task.title.includes(searchString) || task.text.includes(searchString)
      )
    })

    setFilteredTasks(filtered)
  }, [tasks, searchString])
  return filteredTasks
}

export default useFilteredTasks
