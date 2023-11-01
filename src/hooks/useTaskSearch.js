import { useState, useEffect } from 'react';

function useTaskSearch(initTasks) {
    const [filteredTasks, setFilteredTasks] = useState(initTasks);

    const searchText = (textForSearch) => {
        if (textForSearch.trim() !== '') {
            const lowerCaseSearchText = textForSearch.toLowerCase();
            const filtered = initTasks.filter((task) => {
                return (
                    task.title.toLowerCase().includes(lowerCaseSearchText) ||
                    task.text.toLowerCase().includes(lowerCaseSearchText)
                );
            });
            setFilteredTasks(filtered);
        }
    }
    return [filteredTasks, searchText];
}

export { useTaskSearch };