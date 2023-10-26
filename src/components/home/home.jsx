import styled from "./home.module.scss";

const Home = (props) => {
    return (
        <div className={styled.Home}>
            <div className={styled.Home__white}></div>
            <div className={styled.Home__header}>
                <h1>{props.title}</h1>
            </div>
        </div>
    );
};

export default Home;
