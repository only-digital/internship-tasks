import styled from './tasks.module.scss';
import Info from '../info/info';
import Content from '../content/content';
import { useState } from 'react';

const Tasks = ({title, tasks}) => {
    const [listItem, setListItem] = useState(tasks);

    const deleteItem = (id) => {
        setListItem((listItem) => {
            return listItem.filter(item => item.id !== id);
        });
    }

    return (
        <div className={styled.Tasks}>
            <Info title={title}/>
            <Content title={title} tasks={listItem} onDelete={id => deleteItem(id)}/>
        </div>
    )
}

export default Tasks;