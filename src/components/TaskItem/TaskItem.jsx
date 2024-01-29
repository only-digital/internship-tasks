import styled from "./TaskItem.module.scss";

const TaskItem = ({ tasks, onChange, onDelete }) => {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.title.split(" ")[1]} className={styled.TaskItem}>
          <div className={styled.TaskItem__card}>
            <div
              className={`${styled.TaskItem__header}  ${
                task.isCompleted ? styled.done : ""
              }`}
            >
              <button
                onClick={() => onChange(task.id)}
                title="Нажмите чтобы изменить статус задачи"
              >
                {task.title}
              </button>
              <button onClick={() => onDelete(task.id)}>
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
