import React from 'react'
import PropertyDetailModalWithHead from '../PropertyDetail/PropertyDetailModalWithHead'

class SuccessMessagePopup extends React.Component {
  render () {
    const { handleClose, isOpen } = this.props

    return (
      <React.Fragment>
        <PropertyDetailModalWithHead
          title={'Request for information'}
          isOpen={isOpen}
          handleClose={handleClose}
          centered
        >
          <div className='white-popup' id='chatRequestPopup'>
            <button
              onClick={() => {
                handleClose()
              }}
              title='Close (Esc)'
              type='button'
              className='mfp-close'
            >
              ×
            </button>
            <div className='chatForm user-container login-container text-center'>
              <React.Fragment>
                <div className='user-faces'>
                  <img
                    src={'/img/icons/message.svg'}
                    alt=''
                    style={{
                      height: '50px',
                      width: '50px'
                    }}
                  />
                </div>
                <h3 className='user-title'>
                  <div>Congratulations!</div>
                  <br />
                  <div>We have received your request.</div>
                  <br />
                  <div>We will contact you shortly.</div>
                </h3>
                <p>Reply even quicker to the tenants with the app</p>
              </React.Fragment>

              <div className='btn-wrapper'>
                <a
                  href='https://get.speedrent.com'
                  className='btn btn-primary-filled btn-big btn-holder btn-curv text-center'
                >
                  Download the app now!
                </a>
              </div>
            </div>
          </div>
        </PropertyDetailModalWithHead>
      </React.Fragment>
    )
  }
}

export default SuccessMessagePopup
