import React from 'react'
import { Modal } from 'react-bootstrap'

import CONST from '../../globalutilities/consts'
import Icon from '../Common/Icons/Icons'
import styles from './RentalBiddingPopup.module.scss'

class RentalBiddingPopup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUrl: ''
    }
  }

  componentDidMount () {
    this.setState({
      currentUrl: 'https://' + window.location.hostname + this.props.currentPath
    })
  }

  render () {
    const { handleClosePopUp, isOpen } = this.props

    return (
        <div className={`${styles['rental-popup-container']}`} id='rental_popup'>
          <div className={`${styles['rental-popup-container-header']}`}>
            <span>Notify me</span>
            <button
              title="Close (Esc)"
              className="mfp-close"
              style={{
                fontSize:24,
                top:'5px'
              }}
              onClick={handleClosePopUp}>
                x
            </button>
          </div>
          <div className={`${styles['rental-popup-container-body']}`}>
            <span>
              Stay tuned! We are working on the feature
            </span>
          </div>
        </div>
    )
  }
}

export default RentalBiddingPopup
