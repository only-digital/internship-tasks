import styled from './header.module.scss'

const Header = () => {
  return (
    <div className={styled.Header}>
      <div className={styled.Header__logo}>
        <div className={styled.Header__logo__text}>
          Creative Digital Production
        </div>
      </div>
    </div>
  )
}

export default Header
