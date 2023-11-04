import styled from './aside.module.scss';
import Image from 'next/image';

const Aside = () => {
    return (
        <div className = {styled.Aside}>
           <div className ={styled.Aside__button}>
                <Image
                    className={styled.Aside_image}
                    src="/task-logo.svg"
                    width={20}
                    height={20}
                    alt="logo"
                />
                <span>Список задач</span>
                
            </div>            
        </div>
    )
}

export default Aside;