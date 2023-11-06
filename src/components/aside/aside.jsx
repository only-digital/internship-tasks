import styled from './aside.module.scss';


const Aside = () => {
    return (
        <div className={styled.Aside}>
            <button type='button' className={styled.Aside__btn}>Список задач</button>
        </div>
    )
}

export default Aside;

