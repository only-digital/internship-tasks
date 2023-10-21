import { TaskContext } from "@/contexts/TaksContext";
import { useContext } from "react";

export const useSearch = (search) => {
    const { selectedTaskList } = useContext(TaskContext);
    return selectedTaskList.tasks
        .filter(task =>
            (
                task.title.includes(search) ||
                task.text.includes(search)
            ) && search !== ""
        )
}
