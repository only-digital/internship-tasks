import React from 'react'
import Logo from '../logo/logo';
import styles from './navbar.module.scss';

export default function Navbar(props) {
  return (
    <nav className={styles.Navbar}>
        <div className={styles.Navbar__logoBox}>
            <Logo />
        </div>
        <button className={styles.Navbar__button}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M11.3989 1H7.685C3.62429 1 2 2.80476 2 7.31667V12.731C2 17.2429 3.62429 19.0476 7.685 19.0476H12.5579C16.6186 19.0476 18.2429 17.2429 18.2429 12.731V7.63395H15.1889C13.9191 7.63395 12.9218 7.42842 12.2631 6.76976C11.6045 6.1111 11.3989 5.11378 11.3989 3.84395V1ZM17.6757 6.68645L12.5579 1H12.3464V3.84395C12.3464 5.06129 12.5554 5.72211 12.9331 6.09977C13.3108 6.47744 13.9716 6.68645 15.1889 6.68645H17.6757Z" fill="#007FFF"/>
            </svg>
            <span>{props.listName}</span>
        </button>
    </nav>
  )
}
