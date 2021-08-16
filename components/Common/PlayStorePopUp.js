import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import styles from './PlayStorePopUp.module.scss'

import { PLAY_STORE_LINK, APP_STORE_LINK } from '../../globalutilities/consts'

const isWindowContext = typeof window !== 'undefined'

var userAgent =
  (isWindowContext && navigator.userAgent) ||
  (isWindowContext && navigator.vendor) ||
  (isWindowContext && window.opera)

var reg =
  /iPad|iPhone|iPod/.test(userAgent) && isWindowContext && !window.MSStream

const PlayStorePopUp = ({ onClose }) => (
  <div
    className={`${styles['playstore-popup']} ${styles['shadow-sm']} pt-2 pb-2 pl-1 pr-1 bg-white`}
  >
    <div className={styles['store-container']}>
      <a className='close pr-1 ml-2' onClick={onClose}>
        <CloseIcon />
        {/* <i className='fas fa-times' /> */}
      </a>
      <div className='m-hamburger'>
        <img
          src={'/img/logo@2x.png'}
          className={styles['logo']}
          alt='speedhome logo'
        />
      </div>
      <div>
        <h6 className='m-0 p-0'>SPEEDHOME</h6>
        <p
          className='p-0'
          style={{
            fontSize: 14,
            paddingRight: '5px !important'
          }}
        >
          #1 rental platform in Malaysia
        </p>
      </div>
      <a
        href={reg ? APP_STORE_LINK : PLAY_STORE_LINK}
        target={'_blank'}
        className={styles['install-btn']}
      >
        Install
      </a>
    </div>
  </div>
)

export default PlayStorePopUp
