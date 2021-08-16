import React from 'react'

const FlashSalesSticker = ({ message, styles, sale }) => {
  return (
    <div className={styles['propertyDetails__flashSale__sticker']}>
      <span>{sale}</span>
      {message}
    </div>
  )
}

export default FlashSalesSticker
