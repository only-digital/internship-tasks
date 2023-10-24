import { createContext, useEffect, useState } from "react";
import { getIndexPage } from "../../lib/api";

export const TaskContext = createContext();

function TaskProvider(props) {
    const [taskData, setTaskData] = useState();
    const [selectedTasksListId, setSelectedTasksListId] = useState(0);
    const [selectedTaskList, setSelectedTaskList] = useState();

    useEffect(() => {
        const getData = async () => {
            const data = await getIndexPage();
            setTaskData(getIndexPage)
        }
        getData();
    }, []);

    useEffect(() => {
        if (taskData !== undefined) {
            setSelectedTaskList(taskData.find((data) => data.id === selectedTasksListId))
        }
    }, [selectedTasksListId, taskData]);

    const deleteTask = (id) => {
        setTaskData(taskData.map((tasksList) =>
            tasksList.id === selectedTasksListId ?
                {
                    ...tasksList,
                    tasks: tasksList.tasks.filter((task, i) => i !== id)
                }
                : tasksList
        ))
    }

    const toggleTaskComplet = (id) => {
        setTaskData(taskData.map((tasksList) =>
            tasksList.id === selectedTasksListId ?
                {
                    ...tasksList,
                    tasks: tasksList.tasks.map((task, i) =>
                        i === id ?
                            {
                                ...task,
                                isCompleted: !task.isCompleted
                            }
                            : task
                    )
                }
                : tasksList
        ))
    }

    return (
        <TaskContext.Provider
            value={
                {
                    taskData,
                    selectedTasksListId,
                    setSelectedTasksListId,
                    selectedTaskList,
                    deleteTask,
                    toggleTaskComplet
                }
            }
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskProvider