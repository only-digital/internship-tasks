import { TaskContext } from "@/contexts/TaksContext";
import { useContext } from "react";

export const useSearch = (search) => {
    const { activeTaskList } = useContext(TaskContext);
    return activeTaskList.tasks
        .filter(task =>
            (
                task.title.includes(search) ||
                task.text.includes(search)
            ) && search !== ""
        )
}
