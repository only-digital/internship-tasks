import Image from 'next/image';
import cls from './aside-menu.module.scss';

export const AsideMenu = ({ tabTitle }) => {
    return (
        <div className={cls.sidebar}>
            <div className={cls.sidebar__tab}>
                <Image
                    src='/file-icon.png'
                    width={20}
                    height={20} alt='Icon'
                />
                <span>
                    {tabTitle}
                </span>
            </div>
        </div>
    )
}