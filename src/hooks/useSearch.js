import { useMemo } from "react";

const useSearch = (tasks, value) => useMemo(() => {
    if (!value) return tasks;
    return tasks.filter(task =>
        task.title.toLowerCase().includes(value.toLowerCase()) ||
        task.text.toLowerCase().includes(value.toLowerCase())
    );
}, [tasks, value])

export default useSearch;