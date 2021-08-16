import React, { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { withRouter } from 'next/router'
import Container from 'react-bootstrap/Container'
import dynamic from 'next/dynamic'
import { Row, Col } from 'react-bootstrap'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../actions/post'
import Loader from '../Common/Loader'

// import RestrictedModal from '../Common/RestrictedModal'
import Congrats from './Congrats'
import BreadCrumb from '../Common/BreadCrumb'
import CONST from '../../globalutilities/consts'
import SelectPostType from './SelectPostType'
import MessageProgressBar from '../Common/MessageProgressBar'

const StepsNavigation = dynamic(() => import('./StepsNavigation'))
const ProgressBar = dynamic(() => import('./progressBar'))

const Step1 = dynamic(() => import('./Step1'), {
  loading: () => (
    <div className='loading-overlay--post'>
      <Loader />
    </div>
  )
})
const Step2 = dynamic(() => import('./Step2'), {
  loading: () => (
    <div className='loading-overlay--post'>
      <Loader />
    </div>
  )
})
const Step3 = dynamic(() => import('./Step3'), {
  loading: () => (
    <div className='loading-overlay--post'>
      <Loader />
    </div>
  )
})

import styles from './Post.module.scss'
import { getToken, isRentProperty } from '../../globalutilities/helpers'

const Post = props => {
  const [isEdit, setIsEdit] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [selectTedPostType, setSelectTedPostType] = useState('')
  const [activeStep, setActiveStep] = useState(1)
  const [firstStep, setFirstStep] = useState(null)
  const [property, setProperty] = useState(null)
  const [congrats, setCongrats] = useState(false)
  const [photoUploadSuccess, setPhotoUploadSuccess] = useState(false)
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false)
  const [isAgent, setIsAgent] = useState(false)
  const [isAfterLogin, setIsAfterLogin] = useState(false)

  const [nextStep, setNextStep] = useState('Upload Photos')
  const [currentStep, setCurrentStep] = useState('Property Details')
  const [activeSteps, setActiveSteps] = useState(0)
  const [totalSteps, setTotalSteps] = useState(5)

  const { t } = useTranslation('common')

  useEffect(() => {
    if (props.router.asPath.includes('edit')) {
      setIsEdit(true)
    }
    const posData = localStorage.getItem('posData')
    if (posData) {
      setInitialLoad(false)
    }
  }, [])

  useEffect(() => {
    if (getToken()) {
      const posData = localStorage.getItem('posData')
      if (posData) {
        const parsedData = JSON.parse(posData)
        setIsAfterLogin(true)
        setActiveStep(2)
        setActiveSteps(2)
        setFirstStep(parsedData.firstStep)
        setSelectTedPostType(
          parsedData.firstStep.type === 'LANDED'
            ? 'rent'
            : parsedData.firstStep.type === 'HIGHRISE'
            ? 'rent'
            : parsedData.firstStep.type === 'ROOM'
            ? 'rent'
            : 'sale'
        )
        setTotalStepsFun(parsedData.firstStep)
      }
    }
  }, [props.router, getToken()])

  useEffect(() => {
    if (props.propertyDetail) {
      setProperty(props.propertyDetail)
      setInitialLoad(false)
      setSelectTedPostType(
        props.propertyDetail.type === 'LANDED'
          ? 'rent'
          : props.propertyDetail.type === 'HIGHRISE'
          ? 'rent'
          : props.propertyDetail.type === 'ROOM'
          ? 'rent'
          : 'sale'
      )
      setTotalStepsFun(props.propertyDetail)
    }
  }, [props.propertyDetail])

  useEffect(() => {
    if (props.property) {
      setProperty(props.property)
      setInitialLoad(false)
      setSelectTedPostType(
        props.property.type === 'LANDED'
          ? 'rent'
          : props.property.type === 'HIGHRISE'
          ? 'rent'
          : props.property.type === 'ROOM'
          ? 'rent'
          : 'sale'
      )
      setTotalStepsFun(props.property)
    }
  }, [props.property])

  const setTotalStepsFun = propertyDetail => {
    if (
      propertyDetail.type === 'HIGHRISE' &&
      propertyDetail.landmarkLabelVerified
    ) {
      setTotalSteps(4)
    } else if (
      propertyDetail.type === 'HIGHRISE_SALE' &&
      propertyDetail.landmarkLabelVerified
    ) {
      setTotalSteps(3)
    } else {
      if (
        propertyDetail.type === 'HIGHRISE' ||
        propertyDetail.type === 'LANDED'
      ) {
        setTotalSteps(5)
      } else if (
        propertyDetail.type === 'HIGHRISE_SALE' ||
        propertyDetail.type === 'LANDED_SALE'
      ) {
        setTotalSteps(3)
      } else {
        setTotalSteps(4)
      }
    }
  }

  const updateFirstStepData = firstStepData => {
    renderSteps('Extra Information', 'Upload Photos', 2)
    setActiveStep(2)
    setActiveSteps(2)
    setFirstStep(firstStepData)
    setTotalStepsFun(firstStepData)
  }

  const updateSecondStepData = secondStepData => {
    if (
      secondStepData.type === 'HIGHRISE' &&
      secondStepData.landmarkLabelVerified
    ) {
      renderSteps('Key Collection', 'Extra Information', 3)
    } else if (
      secondStepData.type === 'HIGHRISE_SALE' &&
      secondStepData.landmarkLabelVerified
    ) {
      renderSteps('Post For Rent', 'Extra Information', 3)
    } else {
      if (
        secondStepData.type === 'HIGHRISE' ||
        secondStepData.type === 'LANDED'
      ) {
        renderSteps('Confirm GPS Coordinate', 'Extra Information', 3)
      } else if (
        secondStepData.type === 'HIGHRISE_SALE' ||
        secondStepData.type === 'LANDED_SALE'
      ) {
        renderSteps('Confirm GPS Coordinate', 'Extra Information', 3)
      } else {
        renderSteps('Confirm GPS Coordinate', 'Extra Information', 3)
      }
    }
    setActiveStep(3)
    setFirstStep(secondStepData)
    setCongrats(true)
    setTotalStepsFun(secondStepData)
  }

  const photoUploadSuccessMethod = status => {
    setPhotoUploadSuccess(status)
  }

  const showAlertMessage = isAgentError => {
    setIsShowErrorMessage(true)
    setIsAgent(isAgentError)
  }

  const firstStepSelected = () => {
    renderSteps('Upload Photos', 'Property Details', 1)
  }

  const submitExtraInformation = () => {
    if (firstStep.type === 'HIGHRISE' && firstStep.landmarkLabelVerified) {
      renderSteps('Select Lead', 'Key Collection', 4)
    } else if (
      firstStep.type === 'HIGHRISE_SALE' &&
      firstStep.landmarkLabelVerified
    ) {
    } else {
      if (firstStep.type === 'HIGHRISE' || firstStep.type === 'LANDED') {
        renderSteps('Key Collection', 'Confirm GPS Coordinate', 4)
      } else if (
        firstStep.type === 'HIGHRISE_SALE' ||
        firstStep.type === 'LANDED_SALE'
      ) {
        renderSteps('Post for rent', 'Confirm GPS Coordinate', 4)
      } else {
        renderSteps(`What's Next`, 'Confirm GPS Coordinate', 4)
      }
    }
  }

  const renderSteps = (nextStep, currentStep, step) => {
    setNextStep(nextStep)
    setCurrentStep(currentStep)
    setActiveSteps(step)
  }

  return (
    <div>
      <BreadCrumb breadCrumb={isEdit ? CONST.editPostPage : CONST.postPage} />
      {!initialLoad && !isEdit && isRentProperty(selectTedPostType) ? (
        <ProgressBar
          activeStep={activeSteps}
          currentStep={currentStep}
          nextStep={nextStep}
          totalSteps={totalSteps}
        />
      ) : null}
      {photoUploadSuccess && !isEdit ? (
        <MessageProgressBar label={t('post:text_post_photoUpload_success')} />
      ) : null}
      <Container>
        {isEdit && (
          <div className='page-main-title user-main-title'>
            <div className='container'>
              <h1>
                {isEdit ? t('breadcrumb_edit_post') : t('breadcrumb_post')}
              </h1>
            </div>
          </div>
        )}

        <Row>
          <div className={styles['postPage']}>
            {initialLoad ? (
              <>
                <SelectPostType
                  styles={styles}
                  setSelectTedPostType={type => {
                    setSelectTedPostType(type)
                  }}
                  setInitialLoad={initLoad => {
                    setInitialLoad(initLoad)
                  }}
                />
              </>
            ) : (
              <div>
                {isEdit && (
                  <StepsNavigation styles={styles} activeStep={activeStep} />
                )}

                {activeStep === 1 ? (
                  <Step1
                    styles={styles}
                    selectTedPostType={selectTedPostType}
                    updateFirstStepData={updateFirstStepData}
                    firstStepSelected={firstStepSelected}
                    propertyData={property}
                  />
                ) : activeStep === 2 ? (
                  <Step2
                    styles={styles}
                    showAlertMessage={showAlertMessage}
                    selectTedPostType={selectTedPostType}
                    updateSecondStepData={updateSecondStepData}
                    firstStep={firstStep}
                    propertyData={property}
                    onPhotoUploadSuccess={photoUploadSuccessMethod}
                    isAfterLogin={isAfterLogin}
                    activeSteps={activeSteps}
                    currentStep={currentStep}
                    nextStep={nextStep}
                    totalSteps={totalSteps}
                  />
                ) : (
                  <Step3
                    styles={styles}
                    firstStep={firstStep}
                    selectTedPostType={selectTedPostType}
                    propertyData={property}
                    photoUploadSuccess={photoUploadSuccess}
                    submitExtraInformation={submitExtraInformation}
                    activeSteps={activeSteps}
                    currentStep={currentStep}
                    nextStep={nextStep}
                    totalSteps={totalSteps}
                  />
                )}
              </div>
            )}
          </div>
        </Row>

        {/* {isShowErrorMessage ? (
          <RestrictedModal
            isAgent={isAgent}
            onClose={() => setIsShowErrorMessage(false)}
          />
        ) : null} */}

        {!isEdit && activeStep === 3 && congrats ? (
          <Congrats
            styles={styles}
            onClose={() => {
              setCongrats(false)
            }}
          />
        ) : null}
      </Container>
    </div>
  )
}

const mapStateToProps = ({ post }) => {
  return {
    property: post.property
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postActions: bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post))
