import { useState } from "react";
import Image from "next/image";
import { useSearch } from "@/hooks/useSearch";
import styled from "./MainSearch.module.scss"

const MainSearch = () => {
    const [search, setSearch] = useState("");
    console.log(useSearch(search));

    return (
        <div className={styled.MainSearch}>
            <input
                type="text" placeholder="Поиск"
                className={styled.MainSearch__input}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
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