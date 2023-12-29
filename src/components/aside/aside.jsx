import styled from './aside.module.scss';

const Aside = ({children}) => {
    return (
        <div className={styled.Aside}>
            {children}
        </div>
    )
}

export default Aside;