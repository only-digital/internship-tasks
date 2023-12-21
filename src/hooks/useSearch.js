import { useEffect, useState } from 'react';

export const useSearch = ({ query, tasks }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const q = query.trim().toLowerCase();
        const includes = (text) => text.toLowerCase().includes(q);
        const updatedTasks = tasks.filter(({ title, text }) => includes(title) || includes(text));
        setResults(updatedTasks);

    }, [query, tasks]);

    return { results };
}
