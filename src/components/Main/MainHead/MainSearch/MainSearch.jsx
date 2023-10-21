import SearchSvg from "@/asserts/svg/SearchSvg";
import styled from "./MainSearch.module.scss"
import { useSearch } from "@/hooks/useSearch";
import { useState } from "react";


const MainSearch = () => {
    const [search, setSearch] = useState("");
    console.log(useSearch(search));
    return (
        <div className={styled.MainSearch}>
            <input
                type="text" placeholder="Поиск"
                className={styled.MainSearch__input}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button className={styled.MainSearch__searchButton}
            >
                <SearchSvg className={styled.MainSearch__icon} />
            </button>
        </div>
    )
}

export default MainSearch;