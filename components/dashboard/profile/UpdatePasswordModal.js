import React from 'react'
import {
  ValidationForm,
  TextInput,
  Checkbox
} from 'react-bootstrap4-form-validation'
import { Card, Button } from 'react-bootstrap'
import CloseIcon from '@material-ui/icons/Close'
import OutsideClickHandler from 'react-outside-click-handler'
import styles from './UpdatePasswordModal.module.scss'

const updatePasswordModal = props => {
  const {
    backdropVal,
    closeBrowseItem,
    onPasswordChange,
    wrongPassword,
    newpassword,
    oldpassword,
    // showResendOptions,
    submitUpdatePassword,
    redirectToHomePage
  } = props

  return (
    <div className={styles['modal__layout__v2']}>
      <div className={styles['card-container']}>
        <OutsideClickHandler
          onOutsideClick={() => {
            backdropVal === 'static'
              ? ''
              : closeBrowseItem('showPasswordModal', true)
          }}
        >
          <Card className={styles['modal__layout__v2--card']}>
            <Card.Body>
              <div className={styles['closeBtn--container']}>
                <CloseIcon
                  className={styles['icon']}
                  onClick={() =>
                    backdropVal === 'static'
                      ? redirectToHomePage()
                      : closeBrowseItem('showPasswordModal', true)
                  }
                />
              </div>

              <div className={styles['title--container']}>
                <span className={styles['title']}>Update Password</span>
              </div>
              <div className={styles['PhoneNumberModal']}>
                <span className={styles['subtitle']}></span>
                <ValidationForm
                  onSubmit={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    submitUpdatePassword()
                  }}
                >
                  <div
                    className={`custModal ${styles['phoneNumerModal-input']}`}
                    style={{ textAlign: 'left' }}
                  >
                    <label>Old Password</label>

                    <div className='intl-tel-input'>
                      <div className='flag-container'>
                        <TextInput
                          name='oldpassword'
                          style={{ paddingLeft: '4px' }}
                          placeholder='Old password'
                          type='password'
                          minLength='6'
                          maxLength='20'
                          required
                          value={oldpassword}
                          onChange={onPasswordChange}
                          errorMessage={{
                            required: 'old password is required',
                            validator: 'old Password is not valid'
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: '17px', textAlign: 'left' }}>
                      <label>New Password</label>

                      <div className={styles['intl-tel-input']}>
                        <div className='flag-container'>
                          <TextInput
                            name='newpassword'
                            style={{ paddingLeft: '4px' }}
                            placeholder='New password'
                            type='password'
                            minLength='6'
                            maxLength='20'
                            required
                            value={newpassword}
                            onChange={onPasswordChange}
                            errorMessage={{
                              required: 'new password is required',
                              validator: 'new Password is not valid'
                            }}
                          />
                          {wrongPassword ? (
                            <div
                              className={styles['invalid-feedback']}
                              style={{ display: 'block' }}
                            >
                              {wrongPassword}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div
                      className='updatePassConfirm'
                      style={{ marginTop: '30px' }}
                    >
                      <label
                        className={`${styles['checkbox']} form-group ${styles['checkbox-sm']} ${styles['checkbox-inline-sm']}`}
                      >
                        <Checkbox type='checkbox' required />
                        Confirm
                      </label>
                    </div>
                  </div>

                  <Button
                    style={{ marginTop: '30px' }}
                    className={styles['login-submitbtn']}
                    type='submit'
                  >
                    Save Changes
                  </Button>
                </ValidationForm>
              </div>
            </Card.Body>
          </Card>
        </OutsideClickHandler>
      </div>
    </div>
  )
}

export default updatePasswordModal
