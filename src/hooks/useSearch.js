import { useEffect, useState } from "react";

const useSearch = (initialTasks,searchPhrase) => {
const [searchedTasks,setTasks] = useState(initialTasks);
useEffect(() => {
  if (searchPhrase.length>0) {
    const tasksFiltered = [...initialTasks].filter((task)=>{
      return task.title.toLowerCase().includes(searchPhrase)||task.text.toLowerCase().includes(searchPhrase)
    });
    setTasks(tasksFiltered);
  } else setTasks(initialTasks);

},[searchPhrase,initialTasks]);
return [searchedTasks];
}

export default useSearch;