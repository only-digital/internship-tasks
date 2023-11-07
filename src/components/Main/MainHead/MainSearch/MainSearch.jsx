import { useContext } from "react";
import { TaskContext } from "@/contexts/TaksContext";
import styled from "./MainSearch.module.scss"
import Image from "next/image";

const MainSearch = () => {
    const { mainHeadSearch, setMainHeadSearch } = useContext(TaskContext);

    return (
        <div className={styled.MainSearch}>
            <input
                type="text" placeholder="Поиск"
                className={styled.MainSearch__input}
                onChange={(e) => setMainHeadSearch(e.target.value)}
                value={mainHeadSearch}
            />
            <button className={styled.MainSearch__searchButton}>
                <Image src={"/svg/search-svg.svg"}
                    width={"14"}
                    height={"14"}
                    className={styled.MainSearch__icon}
                    alt="search"
                />
            </button>
        </div>
    )
}

export default MainSearch;