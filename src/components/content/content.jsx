import styled from './content.module.scss';
import Search from '../search/search';
import ListItem from '../listItem/listItem';

const Content = ({title, tasks, onDelete}) => {

    const items = tasks.map(item => {
        const {id, ...itemProps} = item;
        return <ListItem 
                    key={id} 
                    {...itemProps} 
                    onDelete={() => onDelete(id)}/>
    });

    return (
        <div className={styled.Content}>
            <div className={styled.Content__emptiness}></div>
            <div className={styled.Content__wrapper}>
                <Search title={title}/>
                <div className={styled.Content__list}>
                    {items}
                </div>
            </div>
        </div>
    )
}

export default Content;