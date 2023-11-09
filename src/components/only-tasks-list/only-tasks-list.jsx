import styled from './only-tasks-list.module.scss';
import OnlySearchInput from '../only-search-input/only-search-input';
import OnlyTask from '../only-task/only-task';

const OnlyTasksList = (props) => {
    return (
        <div className={styled.OnlyTasksList}>
            <div className={styled.OnlyTasksList__headercontainer}>
                <h1 className={styled.OnlyTasksList__header}>{props.title}</h1>
                <OnlySearchInput onSearchTask={props.onSearchTask}/>
            </div>

            <div className={styled.OnlyTasksList__taskscontainer}>
                {props.tasks.map((t,index)=>(
                    <OnlyTask key={index} 
                        index={index} 
                        data={t} 
                        onStatus={props.onStatusTask} 
                        onDelete={props.onDeleteTask}/>
                ))}
            </div>
        </div>
    )
}

export default OnlyTasksList;