import styles from './task.module.scss'
import Image from 'next/image'

import { useState } from 'react'

const Task = () => {
    const [isCompleted, setIsCompleted] = useState(false);
  return (
    <div className={styles.task} onClick={() => setIsCompleted(!isCompleted)}>
        <div className={styles.task__header}>
            <h3 className={`styles.task__title ${isCompleted ? styles.task__title_completed : ''}`}>Task</h3>
            <Image src={require('../../../public/assets/icons/close.svg')} alt="Удалить" />
        </div>
        <div className={styles.task__text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi eius nemo odit velit quos inventore dolorem est reprehenderit quibusdam pariatur aperiam porro non ad distinctio, ut veritatis atque repellendus rem?
        </div>
    </div>
  )
}

export default Task