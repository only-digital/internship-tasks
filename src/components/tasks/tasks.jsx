import styled from './tasks.module.scss';
import Info from '../info/info';
import Content from '../content/content';

const Tasks = (props) => {
    const {title} = props;

    return (
        <div className={styled.Tasks}>
            <Info title={title}/>
            <Content {...props}/>
        </div>
    )
}

export default Tasks;