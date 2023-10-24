import { useState } from "react";
import { useEffect } from "react";

const useSearch = (sting, arr) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const newArr = arr.filter(item => item.text.toLowerCase().includes(sting.toLowerCase()) ||
                                          item.title.toLowerCase().includes(sting.toLowerCase()));
        setTasks(newArr);
    }, [sting, arr]);

    return tasks;
}

export default useSearch;