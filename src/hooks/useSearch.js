import { TaskContext } from "@/contexts/TaksContext";
import { useContext } from "react";

export const useSearch = (search) => {
    const { activeTaskList } = useContext(TaskContext);
    const loweredSearch = search.toLowerCase();

    if (loweredSearch !== "")
        return activeTaskList.tasks
            .filter(task => {
                const loweredTaskTitle = task.title.toLowerCase();
                const loweredTaskText = task.text.toLowerCase();
                return (
                    loweredTaskTitle.includes(loweredSearch) ||
                    loweredTaskText.includes(loweredSearch)
                )
            })

    return activeTaskList.tasks
}
