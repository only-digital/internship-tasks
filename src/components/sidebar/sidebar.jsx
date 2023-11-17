import styled from './sidebar.module.scss';

import file from '../../assets/file.svg';

const Sidebar = () => {
    return (
        <aside className={styled.sidebar}>
			<div className={styled.body}>
				<div className={styled.body__item}>
					<img src={file.src} alt='Task icon'/>
					<span className={styled.body__title}>Список задач</span>
				</div>
			</div>
		</aside>
    )
}

export default Sidebar;