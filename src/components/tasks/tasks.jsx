import styled from './tasks.module.scss';
import Image from 'next/image';
import cross from './../../assets/icons/cross.svg';

const Tasks = (props) => {
    let tasksData = props.tasksData;
    const tasksTitle = tasksData.title;
    const tasksList = tasksData.tasks;

    return (
        <div className={styled.Tasks}>
            <div className={styled.Tasks__bar}></div>
            <section className={styled.Tasks__tasksContainer}>
                <h2 className={styled.Tasks__title}>{tasksTitle}</h2>
                <ul className={styled.Tasks__tasksList}>
                    {tasksList.map((task, index) => (
                        <li key={index}>
                            <div className={styled.Tasks__taskWrapper}>
                                <div className={styled.Tasks__titleWrapper}>
                                    <h4 className={styled.Tasks__task}>{task.title}</h4>
                                    <button className={styled.Tasks__deleteButton}>
                                        <Image
                                            src={cross}
                                            alt="Delete task"
                                        />
                                    </button>
                                </div>
                                <p className={styled.Tasks__taskText}>{task.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default Tasks;
