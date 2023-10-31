
const Todolist = (props) => {

console.log("data", props.tasks)

    return (
        <div className={"todolist__container"}>
            <header className="todolist__header"></header>
            <div className="todolist__wrapper">
                <aside>
                    <div className="todolist__logo">
                        <img src="" alt=""/>
                    </div>
                    <div className="todolist__open">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3989 1H7.685C3.62429 1 2 2.80476 2 7.31667V12.731C2 17.2429 3.62429 19.0476 7.685 19.0476H12.5579C16.6186 19.0476 18.2429 17.2429 18.2429 12.731V7.63395H15.1889C13.9191 7.63395 12.9218 7.42842 12.2631 6.76976C11.6045 6.1111 11.3989 5.11378 11.3989 3.84395V1ZM17.6757 6.68645L12.5579 1H12.3464V3.84395C12.3464 5.06129 12.5554 5.72211 12.9331 6.09977C13.3108 6.47744 13.9716 6.68645 15.1889 6.68645H17.6757Z" fill="#007FFF"/>
                        </svg>
                        <span>Список задач</span>
                    </div>
                </aside>
                <div className="todolist__main">
                    <h1>{props.title}</h1>
                    <ul className="todolist__list">
                        {
                            props.tasks.map((t, index) => {

                                const taskHandler = () => {
                                    props.changeTaskStatus(t.id);
                                }

                                return (
                                <li key={t.id} className={"todolist__task"} onClick={taskHandler}>
                                    <div className={"todolist__task-header"}>
                                        <p className={`todolist__task-name ${t.isCompleted ? "isCompleted" : ""}`}>{t.title}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                            <path d="M20 6L6 20" stroke="#007FFF" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M6 6L20 20" stroke="#007FFF" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                    </div>
                                    <p className="todolist__task-description">{t.text}</p>
                                </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Todolist;