import styled from './content.module.scss';
import Search from '../search/search';
import ListItem from '../listItem/listItem';

const Content = ({title, tasks}) => {

    const items = tasks.map((item, i) => {
        return <ListItem key={i} {...item}/>
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