import styles from './header.module.scss';
import Image from 'next/image';

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.header__logo}>
            <Image src={require('../../../public/assets/icons/logo.svg')} alt="Only"></Image>
        </div>
    </header>
  )
}

export default Header