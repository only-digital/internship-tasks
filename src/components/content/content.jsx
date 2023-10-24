import styled from './content.module.scss';
import Search from '../search/search';
import ListItem from '../listItem/listItem';
import { useState } from 'react';
import useSearch from '@/hooks/useSearch';

const Content = ({title, tasks, onDelete}) => {
    const [searchString, useSearchString] = useState('');

    const onSearch = (str) => {
        useSearchString(str);
    }

    const searchTasks = useSearch(searchString, tasks);

    const newList = (arr) => {
        return arr.map(item => {
            const {id, ...itemProps} = item;
            return <ListItem 
                        key={id} 
                        {...itemProps} 
                        onDelete={() => onDelete(id)}/>
        });
    }

    const result = searchString.length === 0 || searchString === ' ' ? newList(tasks) : newList(searchTasks);

    return (
        <div className={styled.Content}>
            <div className={styled.Content__emptiness}></div>
            <div className={styled.Content__wrapper}>
                <Search title={title} onSearch={str => onSearch(str)}/>
                <div className={styled.Content__list}>
                    {result}
                </div>
            </div>
        </div>
    )
}

export default Content;