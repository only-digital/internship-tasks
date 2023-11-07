import { createContext, useEffect, useState } from "react";
import { getIndexPage } from "../../lib/api";

export const TaskContext = createContext();

function TaskProvider(props) {
    const [AllTasksList, setAllTasksList] = useState();
    const [activeTasksListId, setActiveTasksListId] = useState(0);
    const [activeTaskList, setActiveTaskList] = useState();
    const [filteredActiveTaskList, setFilteredActiveTaskList] = useState();
    const [mainHeadSearch, setMainHeadSearch] = useState("");

    useEffect(() => {
        const getData = async () => {
            const data = await getIndexPage();
            setAllTasksList(data);
        }
        getData();
    }, []);

    useEffect(() => {
        AllTasksList !== undefined &&
            setActiveTaskList(
                AllTasksList.find(({ id: TaskListId }) => TaskListId === activeTasksListId)
            )
    }, [activeTasksListId, AllTasksList]);

    useEffect(() => {
        if (activeTaskList !== undefined) {
            setFilteredActiveTaskList(() => {
                const loweredSearch = mainHeadSearch.toLowerCase();
                if (loweredSearch !== "")
                    return {
                        ...activeTaskList,
                        tasks: activeTaskList.tasks
                            .filter(task => {
                                const loweredTaskTitle = task.title.toLowerCase();
                                const loweredTaskText = task.text.toLowerCase();
                                return (
                                    loweredTaskTitle.includes(loweredSearch) ||
                                    loweredTaskText.includes(loweredSearch)
                                )
                            })
                    }
                return activeTaskList
            })
        }
    }, [mainHeadSearch, activeTaskList])

    const deleteTask = (id) => {
        setAllTasksList(
            AllTasksList.map((tasksList) =>
                tasksList.id === activeTasksListId
                    ? {
                        ...tasksList,
                        tasks: tasksList.tasks.filter((task, taskId) => taskId !== id)
                    }
                    : tasksList
            )
        )
    }

    const toggleTaskComplet = (id) => {
        setAllTasksList(
            AllTasksList.map((tasksList) =>
                tasksList.id === activeTasksListId
                    ? {
                        ...tasksList,
                        tasks: tasksList.tasks.map((task, i) =>
                            i === id
                                ? {
                                    ...task,
                                    isCompleted: !task.isCompleted
                                }
                                : task
                        )
                    }
                    : tasksList
            )
        )
    }

    return (
        <TaskContext.Provider
            value={
                {
                    AllTasksList,
                    activeTasksListId,
                    setActiveTasksListId,
                    filteredActiveTaskList,
                    mainHeadSearch,
                    activeTaskList,
                    setMainHeadSearch,
                    deleteTask,
                    toggleTaskComplet,
                }
            }
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskProvider