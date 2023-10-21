import PageIconSvg from "@/asserts/svg/PageIconSvg"
import styles from "./TaskNav.module.scss"
import React, { useContext } from 'react'
import { TaskContext } from "@/contexts/TaksContext";

function TaskNav({ title, id }) {
  const { selectedTasksListId, setSelectedTasksListId } = useContext(TaskContext);

  return (
    <button className={`
      ${styles.TaskNav}
      ${selectedTasksListId === id && styles.TaskNav_active}
    `
    }
      onClick={() => setSelectedTasksListId(id)}
    >
      <PageIconSvg className={styles.TaskNav__icon} />
      <div className={styles.TaskNav__title}>
        {title}
      </div>
    </button >
  )
}

export default TaskNav