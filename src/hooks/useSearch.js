import { useEffect, useState } from 'react';

const useSearch = (searchedText, tasks) => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const matchedTasks = tasks.filter(({ title, text }) => {
            const inputText = searchedText.trim().toLowerCase();
            return title.toLowerCase().includes(inputText) || text.toLowerCase().includes(inputText);
        });
        setSearchResults(matchedTasks);
    }, [searchedText, tasks]);

    return searchResults;
}

export default useSearch;