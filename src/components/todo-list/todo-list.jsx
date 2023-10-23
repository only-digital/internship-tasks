import styled from "./todo-list.module.scss";
import Image from "next/image";
import useSearchTasks from "./useSearchTasks";
import { useState, useRef } from "react";

const TodoList = (tasks) => {
  console.log(tasks);
  const taskTitleRefs = useRef([]);
  const [currentTasks, setCurrentTasks] = useState(tasks.props);
  const [query, setQuery] = useState("");

  const handleClick = (e, index) => {
    const taskTitleRef = taskTitleRefs.current[index];
    taskTitleRef.isCompleted = !taskTitleRef.isCompleted;
    if (taskTitleRef && taskTitleRef.isCompleted === true) {
      taskTitleRef.style.textDecoration = "line-through";
      taskTitleRef.style.color = "rgba(22, 31, 62, 0.3)";
    }
    if (taskTitleRef && taskTitleRef.isCompleted === false) {
      taskTitleRef.style.textDecoration = "none";
      taskTitleRef.style.color = "rgba(22, 31, 62, 0.9)";
    }
  };
  const filteredTasks = useSearchTasks(query, currentTasks);
  const handleDeleteTask = (title) => {
    const newTasks = currentTasks.filter((task) => task.title !== title);
    setCurrentTasks(newTasks);
  };
  return (
    <div className={styled["todo-list"]}>
      <div className={styled["todo-list__sidebar"]}>
        <div className={styled["todo-list__sidebar__logo"]}>
          <Image
            src={
              "https://res.cloudinary.com/dyvmnrk8q/image/upload/v1698050522/Only._rve90e.svg"
            }
            width={72}
            height={27}
            className={styled["todo-list__sidebar__logo__icon"]}
            alt={"logo icon"}
          />
          <span className={styled["todo-list__sidebar__logo__text"]}>
            Creative Digital Production
          </span>
        </div>
        <div className={styled["todo-list__sidebar__list"]}>
          <div className={styled["todo-list__sidebar__list__label"]}>
            <Image
              src={
                "https://res.cloudinary.com/dyvmnrk8q/image/upload/v1698050671/Frame_2131327682_w4ec5s.svg"
              }
              width={20}
              height={20}
              alt={"Task list label"}
              className={styled["todo-list__sidebar__list__label__icon"]}
            />
            <span className={styled["todo-list__sidebar__list__label__text"]}>
              Список задач
            </span>
          </div>
        </div>
      </div>
      <div className={styled["todo-list__tasks"]}>
        <div className={styled["todo-list__tasks__placeholder"]}></div>
        <div className={styled["todo-list__tasks__wrapper"]}>
          <div className={styled["todo-list__tasks__caption"]}>
            <h2 className={styled["todo-list__tasks__title"]}>Список задач</h2>
            <input
              className={styled["todo-list__tasks__search"]}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск"
            />
          </div>
          <ul className={styled["todo-list__tasks__list"]}>
            {filteredTasks.map((task, index) => (
              <li
                key={index}
                className={styled["todo-list__task"]}
                onClick={(e) => handleClick(e, index)}
                isCompleted={false}
              >
                <h3
                  className={styled["todo-list__task__title"]}
                  ref={(el) => (taskTitleRefs.current[index] = el)}
                >
                  {task.title}
                  <button>
                    <Image
                      src={
                        "https://res.cloudinary.com/dyvmnrk8q/image/upload/v1698050798/closeIcon_jtanba.svg"
                      }
                      width={14}
                      height={14}
                      alt={"Task close icon"}
                      className={styled["todo-list__task__close"]}
                      onClick={(e) => handleDeleteTask(task.title)}
                    />
                  </button>
                </h3>
                <p className={styled["todo-list__task__desc"]}>{task.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
