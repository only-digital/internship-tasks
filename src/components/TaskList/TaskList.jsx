import styled from "./TaskList.module.scss";

const TaskList = ({ tasks, title }) => {
  console.log(tasks);
  return (
    <div className={styled.TaskList}>
      <h3>{title}</h3>
    </div>
  );
};

export default TaskList;
