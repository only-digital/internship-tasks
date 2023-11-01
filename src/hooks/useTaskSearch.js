import { useState, useEffect } from 'react';

// Функция-хук для поиска задач по тексту
function useTaskSearch(initTasks) {

    const [filteredTasks, setFilteredTasks] = useState([...initTasks]);

    const searchText = (textForSearch) => {
        console.log('text', textForSearch, 'tasks', filteredTasks)
        if (textForSearch.trim() !== '')
        {
            const lowerCaseSearchText = textForSearch.toLowerCase();
            const filtered = filteredTasks.filter((task) => {
                return (
                    task.title.toLowerCase().includes(lowerCaseSearchText) ||
                    task.text.toLowerCase().includes(lowerCaseSearchText)
                );
            });
            setFilteredTasks(filtered);
            console.log("filtered", filtered)
        }
    }

    return [filteredTasks, searchText];
}

export {useTaskSearch};