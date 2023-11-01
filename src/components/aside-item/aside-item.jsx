import styled from './aside-item.module.scss';
import Image from 'next/image';
import taskIcon from '../../../public/images/task_image.svg';

const AsideItem = ({ title }) => {
  return (
    <div className={styled.AsideItem}>
      <Image
        className={styled.image}
        width={20}
        height={20}
        src={taskIcon}
        alt="иконка папки"
      />
      <p className={styled.title}>{title}</p>
    </div>
  );
};

export default AsideItem;
