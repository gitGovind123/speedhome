import React from 'react'

const MobileSidebar = props => {
  const { styles, isMobileMenuOpened, renderMenu, handleOutsideClick } = props

  return (
    <div
      className={`${styles[isMobileMenuOpened ? 'nav-active' : '']} ${
        styles['mobile-side-bar']
      }`}
    >
      <div
        className={`${styles['header-menu-inner']} ${styles['mobile-menu']}`}
      >
        <div className={styles['backward']} onClick={handleOutsideClick} />
        {renderMenu()}
      </div>
    </div>
  )
}

export default MobileSidebar
