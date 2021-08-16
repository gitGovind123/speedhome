import React from 'react'
import ReactDOM from 'react-dom'
import ClearIcon from '@material-ui/icons/Clear'
import styles from './MobileToolTip.module.scss'

const MobileToolTip = props => {
  const { isOpen, closeToolTip, content } = props
  return (
    isOpen &&
    ReactDOM.createPortal(
      <div className={styles['tooltipWrapper']}>
        <div className={styles['tooltipWrapper__clearIconWrapper']}>
          <ClearIcon
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              closeToolTip(false)
            }}
            size={24}
            color='#000'
          />
        </div>
        <div className={styles['tooltipContentWrapper']}>
          <div className={styles['tooltipContent']}>
            <div className={styles['tooltipContent__header']}>
              {content?.title}
            </div>
            <div className={styles['tooltipContent__text']}>
              {content?.content}
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  )
}

export default MobileToolTip
