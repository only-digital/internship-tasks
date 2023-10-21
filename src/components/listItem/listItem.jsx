import styled from './listItem.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import cross from '/public/cross-big.png';

const ListItem = ({title, text, isCompleted}) => {

    const [complete, setComplete] = useState(isCompleted);

    let classNames = styled.ListItem__title;
    if (complete) {
        classNames = styled.ListItem__complete;
    }
    
    const changeState = (e) => {
        if (e.target.nodeName !== 'IMG') {
            setComplete(!complete);
        } 
    }

    return (
        <div className={styled.ListItem}>
            <div className={styled.ListItem__header} onClick={(e) => changeState(e)}>
                <div className={classNames}>{title}</div>
                <button className={styled.ListItem__btn}>
                    <Image src={cross}></Image>
                </button>
            </div>
            <div className={styled.ListItem__text}>{text}</div>
        </div>
    )
}

export default ListItem;