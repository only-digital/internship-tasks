import styled from "./sidebar.module.scss";

const Sidebar = (props) => {
    return (
        <div className={styled.Sidebar}>
            <div className={styled.Sidebar__header}>
                <a
                    href="https://only.digital"
                    target="_blank"
                    className={styled.Sidebar__header__logo}
                >
                    <img src="logo.svg" />
                    <div className={styled.Sidebar__header__text}>
                        Creative
                        <br />
                        Digital
                        <br />
                        Production
                    </div>
                </a>
            </div>
            <div className={styled.Sidebar__body}>
                <div className={styled.Sidebar__button}>
                    <img src="file.svg" />
                    {props.title}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
