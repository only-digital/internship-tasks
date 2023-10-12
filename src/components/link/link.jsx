import styles from './link.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const LinkComponent = ({children, href}) => {
  return (
    <Link href={href} className={styles.link}>
        <Image src={require('../../../public/assets/icons/file.svg')} alt={children} />
        <span className={styles.link__text}>{children}</span>
    </Link>
  )
}

export default LinkComponent