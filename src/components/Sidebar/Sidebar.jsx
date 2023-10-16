import Image from "next/image";
import styled from "./Sidebar.module.scss";
import iconTask from "@/assets/icons/task-svg.svg";

const Sidebar = () => {
  return (
    <div className={styled.Sidebar}>
      <button className={styled.tasks}>
        <Image src={iconTask} alt="task" />
        <p>Список задач</p>
      </button>
    </div>
  );
};

export default Sidebar;
