import Image from "next/image"
import styles from "./HeaderLogo.module.scss"

function HeaderLogo() {
    return (
        <div className={styles.HeaderLogo}>
            <Image
                src={"/svg/logo-svg.svg"} 
                className={styles.HeaderLogo__icon} 
                width={"72"} height={"27"} />
            <span className={styles.HeaderLogo__text}>Creative Digital Production</span>
        </div>
    )
}

export default HeaderLogo