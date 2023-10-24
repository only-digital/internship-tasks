import { useMemo, useState } from "react"

export const useTasks = (list, filter) => {
    const [searchTasks, setSearchTasks] = useState(list)

    useMemo(() => {
        const newTasks = list.filter((t) =>
        t.title.toLowerCase().includes(filter.trim()) ||
        t.text.toLowerCase().includes(filter.trim()));
        
        setSearchTasks(newTasks) 
    }, [filter, list])

    return  { searchTasks }
}