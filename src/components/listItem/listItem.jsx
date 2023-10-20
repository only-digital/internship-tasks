import styled from './listItem.module.scss';
import Image from 'next/image';
import cross from '/public/cross-big.png';

const ListItem = ({title, text, isCompleted}) => {


    return (
        <div className={styled.ListItem}>
            <div className={styled.ListItem__header}>
                <div className={styled.ListItem__title}>{title}</div>
                <button className={styled.ListItem__btn}>
                    <Image src={cross}></Image>
                </button>
            </div>
            <div className={styled.ListItem__text}>{text}</div>
        </div>
    )
}

export default ListItem;