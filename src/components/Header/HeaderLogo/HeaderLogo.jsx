import React from 'react'
import styles from "./HeaderLogo.module.scss"
import LogoSvg from '@/asserts/svg/logoSvg'

function HeaderLogo() {
    return (
        <div className={styles.HeaderLogo}>
            <LogoSvg className={styles.HeaderLogo__icon} />
            <span className={styles.HeaderLogo__text}>Creative Digital Production</span>
        </div>
    )
}

export default HeaderLogo