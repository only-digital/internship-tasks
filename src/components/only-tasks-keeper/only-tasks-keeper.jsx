import styled from './only-tasks-keeper.module.scss';
import OnlyHeader from '../only-header/only-header';
import OnlyMainHeader from '../only-main-header/only-main-header';
import OnlyTasksList from '../only-tasks-list/only-tasks-list';
import { useEffect, useState } from 'react';
import useSearch from '@/hooks/useSearch';

const OnlyTasksKeeper = (props) => {
    const {title} = props.data;
    const[tasks,setTasks]=useState(props.data.tasks);
    const[text,setText]=useState('');

    useEffect(()=>{
        const newTasks = useSearch(props.data.tasks,text);
        setTasks(newTasks);
    },[text]);

    function handleStatus(index){
        const newTasks = [...tasks];
        newTasks[index].isCompleted=!newTasks[index].isCompleted;
        setTasks(newTasks);
    };

    function handleDelete(index){
        const newTasks = [...tasks];
        newTasks.splice(index,1);
        setTasks(newTasks);
    };

    function handleSearch(e){   
        setText(e.target.value);
    };

    return (
        <div className={styled.OnlyTasksKeeper}>
            <div className={styled.OnlyTasksKeeper__headercontainer}>
                <OnlyHeader/>
            </div>
            <div className={styled.OnlyTasksKeeper__mainheadercontainer}>
                <OnlyMainHeader data={title}/>
            </div>
            <div className={styled.OnlyTasksKeeper__taskslistcontainer}>
                <OnlyTasksList tasks={tasks} 
                    onDeleteTask={handleDelete} 
                    onStatusTask={handleStatus} 
                    onSearchTask={handleSearch}
                    title={title}/>
            </div>
        </div>
    )
}

export default OnlyTasksKeeper;