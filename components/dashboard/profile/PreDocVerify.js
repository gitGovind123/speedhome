import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import DoneIcon from '@material-ui/icons/Done'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'next/router'
import * as dealAction from '../../../actions'
import * as ramciAction from '../../../actions/ramciActions'

import CreditCheck from '../../../pages/deal/creditCheck'
import UploadDocs from '../../../pages/deal/uploadDocument'

import styles from './PreDocVerify.module.scss'

const PreDocVerify = props => {
  const [isPreDocVerified, setIsPreDocVerified] = useState(false)
  const [docStatus, setDocStatus] = useState('INITIAL')
  const [isRamciVerified, setIsRamciVerified] = useState(false)
  const [isUploadStatusVerified, setIsUploadStatusVerified] = useState(false)
  const [isReSubmit, setIsResubmit] = useState(false)
  const [isMalaysian, setIsMalaysian] = useState(false)

  useEffect(() => {
    props.dealAction.getDealIdByUserId().then(document => {
      if (document && document.verificationStatus === 'VERIFIED') {
        setIsPreDocVerified(true)
        setIsRamciVerified(true)
        setIsUploadStatusVerified(true)
      } else {
        if (document && document.documentFileDtoList.length > 0) {
          setIsPreDocVerified(true)
          setIsRamciVerified(true)
          setIsUploadStatusVerified(true)
        } else {
          setIsPreDocVerified(false)
          getRamciStatus()
        }

        // getDealUploadStatus()
      }
      // setDocumentInfo(document)
    })
  }, [])

  useEffect(() => {
    if (props.router.query.q) {
      let pageElement = document.getElementById('reach_zero_depost_eligibility')
      let positionX = 0,
        positionY = 0

      while (pageElement != null) {
        positionX += pageElement.offsetLeft
        positionY += pageElement.offsetTop
        pageElement = pageElement.offsetParent
        window.scrollTo(positionX, positionY)
      }
    }
  }, [props.router.query.q])

  useEffect(() => {}, [props.user])

  const getRamciStatus = () => {
    props.ramciAction.getRamciStatus().then(ramciRes => {
      if (ramciRes && ramciRes.type === 'SUCCESS') {
        if (
          ramciRes.payload.status === 'NOT_FOUND' ||
          ramciRes.payload.status === 'SUBMITTED'
        ) {
          setIsRamciVerified(false)
        } else {
          setIsRamciVerified(true)
        }
      }
    })
  }

  const submitVerifyBtn = () => {
    if (!isPreDocVerified) {
      if (isRamciVerified) {
        if (!isUploadStatusVerified) {
          setDocStatus('DOC')
        }
      } else {
        setDocStatus('RAMCI')
      }
    }
  }
  const updatePreDocState = (status, isLocal) => {
    setDocStatus(status)
    setIsMalaysian(isLocal)
  }
  const finishPreDocStatus = () => {
    setDocStatus('INITIAL')
    setIsRamciVerified(true)
    setIsUploadStatusVerified(true)
    setIsPreDocVerified(true)
  }
  const reSubmitVeryFy = () => {
    setDocStatus('RAMCI')
    setIsRamciVerified(false)
    setIsUploadStatusVerified(false)
    setIsPreDocVerified(false)
    setIsResubmit(true)
  }

  const renderStepView = () => {
    if (docStatus === 'INITIAL') {
      return (
        <>
          <div className={styles['predoc__tick--img--container']}>
            <span>
              <strong>{isPreDocVerified ? 'Verified' : 'Get Verified!'}</strong>
            </span>
            {isPreDocVerified ? (
              <img src={'/img/verifyIcon_green.png'} alt='Verify Icon' />
            ) : (
              <img src={'/img/verifyIcon.png'} alt='Un-Verify Icon' />
            )}
            <span>
              {isPreDocVerified
                ? 'Alicia will reach out to you soon'
                : 'Few steps to check your eligibility'}
            </span>
          </div>
          <div className={styles['predoc__tick--steps--container']}>
            <div>
              <p>Credit check</p>
              {isRamciVerified ? (
                <DoneIcon className={styles['doneIcon']} />
              ) : null}
            </div>

            <div>
              <p>Upload document</p>

              {isUploadStatusVerified ? (
                <DoneIcon className={styles['doneIcon']} />
              ) : null}
            </div>

            <Button
              className={styles['verifyBtn']}
              style={{
                color: isPreDocVerified ? '#fff' : '#000',
                backgroundColor: isPreDocVerified ? 'green' : '#ffe100'
              }}
              onClick={submitVerifyBtn}
            >
              {isPreDocVerified
                ? 'Completed'
                : isRamciVerified
                ? 'Next'
                : 'Verify'}
            </Button>
            {isPreDocVerified ? (
              <Button
                className={`${styles['verifyBtn']} ${styles['reSubmitBtn']}`}
                onClick={reSubmitVeryFy}
              >
                Re-submit
              </Button>
            ) : null}
          </div>
        </>
      )
    } else if (docStatus === 'RAMCI') {
      return (
        <>
          <CreditCheck updatePreDocState={updatePreDocState} />
        </>
      )
    } else if (docStatus === 'DOC') {
      return (
        <>
          <UploadDocs
            finishPreDocStatus={finishPreDocStatus}
            isLocal={isMalaysian}
          />
        </>
      )
    }
  }

  return (
    <div className='row' id='reach_zero_depost_eligibility'>
      <div className='col-md-12'>
        <div className='ownerOfUnit form-group'>
          <h3
            style={{
              borderBottom: '2px solid #404040',
              paddingBottom: '.5rem'
            }}
          >
            Zero Deposit Eligibility
          </h3>
        </div>
        <div className='predoc__tick--container'>{renderStepView()}</div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  }
}

const actionsStateToProps = dispatch => {
  return {
    dealAction: bindActionCreators(dealAction, dispatch),
    ramciAction: bindActionCreators(ramciAction, dispatch)
  }
}

export default connect(
  mapStateToProps,
  actionsStateToProps
)(withRouter(PreDocVerify))
