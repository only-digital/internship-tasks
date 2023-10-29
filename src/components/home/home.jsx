import styled from "./home.module.scss";
import Tasks from "../tasks/tasks";

const Home = (props) => {
    return (
        <div className={styled.Home}>
            <div className={styled.Home__white}></div>
            <div className={styled.Home__header}>
                <h1>{props.title}</h1>
            </div>
            <div className={styled.Home__taskContainer}>
                <Tasks tasks={props.tasks} onToggleTask={props.onToggleTask} onDeleteTask={props.onDeleteTask} />
            </div>
        </div>
    );
};

export default Home;
