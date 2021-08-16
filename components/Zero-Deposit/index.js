import React from 'react'
import AddImageIcon from '@material-ui/icons/AddAPhoto'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import validator from 'validator'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import Cleave from 'cleave.js/react'
import { ClipLoader } from 'react-spinners'
import useTranslation from 'next-translate/useTranslation'

const ZeroDepositComponent = props => {
  const {
    icFront,
    icBack,
    icImageError,
    nricName,
    nricEmail,
    activeItem,
    nricPhone,
    nricNumber,
    nricNumberError,
    checkboxStatus,
    checkboxError,
    isloading,
    setNricNumberError,
    //function starts
    submitRamciForm,
    icImageChange,
    userInputChange,
    handleRadioChange,
    removeImagePreview
  } = props
  const { t } = useTranslation('common')
  return (
    <ValidationForm
      onSubmit={e => {
        e.preventDefault()
        submitRamciForm()
      }}
    >
      <div className='uploader-doc-row photo-thumb-listing'>
        <div className='col'>
          <strong className='content-title'>{t('text_ramci_icFront')}</strong>
          <div className='box'>
            {icFront.url ? (
              <div className='js--image-preview' id='imgFront'>
                <img loading='lazy' src={icFront.url} className='previewImg' />
                <DeleteIcon
                  style={{
                    fill: 'red',
                    height: '30px',
                    width: '30px',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer'
                  }}
                  onClick={() => removeImagePreview('icFront')}
                />
              </div>
            ) : null}
            <div className='upload-options'>
              <label>
                <TextInput
                  type='file'
                  id='frontImage'
                  name='icFront'
                  className='image-upload'
                  accept='image/*'
                  onChange={icImageChange}
                />
                <AddImageIcon className='icon' />
              </label>
            </div>
          </div>
        </div>
        <div className='col'>
          <strong className='content-title'>{t('text_ramci_icBack')}</strong>
          <div className='box'>
            {icBack.url ? (
              <div className='js--image-preview' id='imgBack'>
                <img loading='lazy' src={icBack.url} className='previewImg' />
                <DeleteIcon
                  style={{
                    fill: 'red',
                    height: '30px',
                    width: '30px',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer'
                  }}
                  onClick={() => removeImagePreview('icBack')}
                />
              </div>
            ) : null}
            <div className='upload-options'>
              <label>
                <TextInput
                  type='file'
                  id='backImage'
                  name='icBack'
                  className='image-upload'
                  accept='image/*'
                  onChange={icImageChange}
                />
                <AddImageIcon className='icon' />
              </label>
            </div>
          </div>
        </div>
        {icImageError ? (
          <span className='icError'>{t('text_icError')}</span>
        ) : null}
      </div>

      <div className='ramci-form'>
        <Row className='gutter-big'>
          <Col xs={12} md={6}>
            <div className='input-box floating-placeholder no-icon'>
              <TextInput
                name='nricName'
                type='text'
                className='form-control'
                placeholder={t('text_ramci_name')}
                value={nricName}
                required
                onChange={userInputChange}
                errorMessage={{
                  required: `${t('text_ramci_NameReq')}`
                }}
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className='input-box floating-placeholder no-icon'>
              <TextInput
                name='nricEmail'
                type='email'
                required
                className='form-control'
                placeholder={t('text_ramci_mail')}
                value={nricEmail}
                onChange={userInputChange}
                validator={validator.isEmail}
                errorMessage={{
                  validator: `${t('text_ramci_emailError')}`
                }}
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className='input-box floating-placeholder no-icon'>
              <div
                className='intl-tel-input'
                style={{
                  border: 'none'
                }}
              >
                <div className='flag-container'>
                  <div
                    className='selected-flag'
                    title={`${activeItem.name} ${activeItem.code}`}
                    style={{
                      height: '97%'
                    }}
                    disabled
                  >
                    <div
                      className={`iti-flag ${activeItem.acronym}`}
                      style={{
                        backgroundImage: `url(${'/img/flags.png'})`
                      }}
                    />
                    <div
                      className='selected-dial-code'
                      id='intl-tel-prefix'
                      style={{
                        marginLeft: '1rem'
                      }}
                    >
                      +{activeItem.code}
                    </div>
                    <div className='iti-arrow' />
                  </div>

                  <TextInput
                    name='nricPhone'
                    type='text'
                    required
                    className='form-control'
                    placeholder={t('text_ramci_phone')}
                    value={nricPhone}
                    onChange={userInputChange}
                    style={{
                      border: 'none'
                    }}
                    errorMessage={{
                      required: `${t('text_ramci_phoneError')}`
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className='input-box floating-placeholder no-icon'>
              <Cleave
                options={{
                  delimiter: '-',
                  blocks: [6, 2, 4]
                }}
                className='form-control'
                name='nricNumber'
                style={{
                  borderColor:
                    nricNumber.length > 0 && nricNumber.length !== 14
                      ? 'red'
                      : '#727272'
                }}
                maxLength='14'
                placeholder={t('text_ramci_nric')}
                value={nricNumber}
                onChange={userInputChange}
                onBlur={() => {
                  if (nricNumber) {
                    if (nricNumber.length !== 14) {
                      setNricNumberError(t('text_ramci_nricNumberError'))
                    } else {
                      if (isNaN(nricNumber.split('-').join(''))) {
                        setNricNumberError(t('text_ramci_nricNumberError'))
                      } else {
                        setNricNumberError('')
                      }
                    }
                  }
                }}
              />
              {nricNumberError.length > 0 ? (
                <div className='invalid-feedback' style={{ display: 'block' }}>
                  {nricNumberError}
                </div>
              ) : null}
            </div>
          </Col>
        </Row>

        <div className='check-wrap check-frame-wrap'>
          <label className='checkbox form-group checkbox-sm checkbox-inline-sm'>
            <TextInput
              type='checkbox'
              name='creditInfo'
              onChange={e => handleRadioChange(e)}
              checked={checkboxStatus}
            />
            <span
              className={
                checkboxStatus
                  ? 'checkbox__icon checkbox__checked'
                  : 'checkbox__icon'
              }
            />{' '}
            <f className={checkboxError ? 'checkboxError' : ''}>
              {' '}
              {t('text_ramci_ack')}
            </f>
          </label>
        </div>
        <div className='btn-wrapper'>
          <button
            id='submitRamciQuestion'
            type='submit'
            disabled={isloading}
            className='btn btn-big text-center btn-secondary-filled btn-holder btn-curv nric-submit'
          >
            {t('btn_submit')}
            <ClipLoader
              sizeUnit={'px'}
              size={20}
              color={'#123abc'}
              loading={isloading}
            />
          </button>
        </div>
        <div id='nricThankyouPopup' className='white-popup  mfp-hide'>
          <div className='user-container login-container text-center'>
            <div className='popup-header'>{t('text_header_success')}</div>
            <p>{t('text_header_success_msg')}</p>
          </div>
        </div>
      </div>
    </ValidationForm>
  )
}

export default ZeroDepositComponent
