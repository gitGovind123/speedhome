import React from 'react'
import { Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import CONST from '../../globalutilities/consts'
import Icon from '../Common/Icons/Icons'
import PropertyDetailModalWithHead from './PropertyDetailModalWithHead'
import styles from './SharePopup.module.scss'

class SharePopup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      copySuccess: false,
      currentUrl: ''
    }
  }

  componentDidMount () {
    this.setState({
      currentUrl: 'https://' + window.location.hostname + this.props.currentPath
    })
  }

  openFacbookPage = () => {
    const fbURL =
      'https://www.facebook.com/sharer/sharer.php?u=' + this.state.currentUrl
    window.open(fbURL, '_blank')
  }

  copyText = () => {
    let textArea = document.getElementById('copyUrl')
    textArea.select()
    toast('Link copied', {
      autoClose: CONST.ToastTimeout,
      type: toast.TYPE.SUCCESS
    })
    this.setState({ copySuccess: true })
  }

  render () {
    const { handleClose, isOpen } = this.props

    return (
      <PropertyDetailModalWithHead
        isOpen={isOpen}
        handleClose={handleClose}
        centered
        title={'Share'}
      >
        <ToastContainer />
        <div id='share_popup' style={{ zIndex: '9999' }}>
          <div className={`${styles['share-container']} text-center`}>
            <div className={styles['btn-extra']}>
              <a
                id='btnFacebookShare'
                onClick={this.openFacbookPage}
                className={`btn btn-curv ${styles['btn-facebook-filled']} ${styles['shareFb']}`}
                target='_blank'
              >
                <Icon icon='facebookSq' size={'middle'} white />
                <span>Share with facebook</span>
              </a>
              <CopyToClipboard
                text={this.state.currentUrl}
                onCopy={this.copyText}
              >
                <a
                  className={`btn btn-curv btn-dark-gray-filled ${styles['btn-copyLink']}`}
                >
                  <Icon icon='shareIcon' size={'middle'} white />
                  <span>Copy link</span>
                </a>
              </CopyToClipboard>

              <small>
                <input
                  id='copyUrl'
                  value={this.state.currentUrl}
                  type='text'
                  className={`form-control ${styles['linkBox']}`}
                  readOnly='readOnly'
                />
              </small>
            </div>
          </div>
        </div>
      </PropertyDetailModalWithHead>
    )
  }
}

export default SharePopup
