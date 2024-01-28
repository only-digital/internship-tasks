import styled from "./TaskItem.module.scss";

const TaskItem = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.title.split(" ")[1]} className={styled.TaskItem}>
          <div className={styled.TaskItem__card}>
            <div className={styled.TaskItem__header}>
              {task.title}
              <button>
                <img src="cross.svg" alt="close" />
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
