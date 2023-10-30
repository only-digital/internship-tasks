import styled from "./home.module.scss";
import Tasks from "../tasks/tasks";
import useSearch from "@/hooks/useSearch";
import SearchInput from "../search-input/search-input";
import { useState } from "react";

const Home = (props) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const filteredTasks = useSearch(searchValue, props.tasks);

    return (
        <div className={styled.Home}>
            <div className={styled.Home__white}></div>
            <div className={styled.Home__header}>
                <h1 className={styled.Home__header__title}>{props.title}</h1>
                <div className={styled.Home__header__input}>
                    <SearchInput
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className={styled.Home__taskContainer}>
                <Tasks
                    tasks={filteredTasks}
                    onToggleTask={props.onToggleTask}
                    onDeleteTask={props.onDeleteTask}
                />
            </div>
        </div>
    );
};

export default Home;
