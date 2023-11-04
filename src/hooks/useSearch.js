const useSearch = (tasks, query) =>  {
    if (!query) return tasks;

    const filteredTasks = tasks.filter (task => 
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.text.toLowerCase().includes(query.toLowerCase())
    );
   
    
    return filteredTasks;
}

export default useSearch;