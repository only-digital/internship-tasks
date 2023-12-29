import styled from './content.module.scss';

const Content = ({children}) => {
    return (
        <div className={styled.Content}>
            {children}
        </div>
    )
}

export default Content;