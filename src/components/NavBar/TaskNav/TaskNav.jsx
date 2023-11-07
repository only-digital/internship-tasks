import { useContext } from 'react'
import { TaskContext } from "@/contexts/TaksContext";
import styles from "./TaskNav.module.scss"
import PageIconSvg from "@/asserts/svg/PageIconSvg"

function TaskNav({ TasksListTitle, TasksListId }) {
  const { activeTasksListId, setActiveTasksListId } = useContext(TaskContext);

  return (
    <button
      className={`
      ${styles.TaskNav}
      ${activeTasksListId === TasksListId && styles.TaskNav_active}
    `}
      onClick={() => setActiveTasksListId(TasksListId)}
    >
      <PageIconSvg className={styles.TaskNav__icon} />
      <div className={styles.TaskNav__title}>
        {TasksListTitle}
      </div>
    </button >
  )
}

export default TaskNav