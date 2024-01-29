import styled from "./TaskItem.module.scss";

const TaskItem = ({ tasks, onChange, onDelete }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <div key={index} className={styled.TaskItem}>
          <div className={styled.TaskItem__card}>
            <div
              className={`${styled.TaskItem__header}  ${
                task.isCompleted ? styled.done : ""
              }`}
            >
              <button
                onClick={() => onChange(index)}
                title="Нажмите чтобы изменить статус задачи"
              >
                {task.title}
              </button>
              <button onClick={() => onDelete(task)}>
                <img src="cross.svg" alt="close" title="удалить" />
              </button>
            </div>
            <div className={styled.TaskItem__descr}>{task.text}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskItem;
