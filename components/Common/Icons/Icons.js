import React from 'react'
import stylesMain from './icons.module.scss'

const IconComponent = ({
  size,
  icon,
  colored,
  stroked,
  white,
  starred,
  blue,
  black,
  grey
}) => {
  const styles = [
    stylesMain['Icon'],
    stylesMain[`Icon--${size}`],
    colored ? stylesMain['Icon--colored'] : null,
    stroked ? stylesMain['Icon--stroked'] : null,
    white ? stylesMain['Icon--white'] : null,
    blue ? stylesMain['Icon--blue'] : null,
    starred ? stylesMain['Icon--starred'] : null,
    black ? stylesMain['Icon--black'] : null,
    grey ? stylesMain['Icon--grey'] : null
  ].filter(n => n !== null)
  return (
    <svg className={styles.join(' ')}>
      <use xlinkHref={'/img/icons/sprite.svg' + '#' + icon} />
    </svg>
  )
}

export default IconComponent
