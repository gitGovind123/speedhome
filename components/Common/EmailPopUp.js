import React, { useState } from 'react'
import { Modal, Form, InputGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import useTranslation from 'next-translate/useTranslation'

import { connect } from 'react-redux'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { submitUserProfile } from '../../actions'

import { isValidEmail } from '../../utils/utils'
import styles from './EmailPopUp.module.scss'

const EmailPopUp = ({ visible, onHide, ...props }) => {
  const [email, setEmail] = useState('')
  const [errmsg, setErrmsg] = useState('')

  const { t } = useTranslation('common')

  const handleEmail = e => {
    setEmail(e.target.value)
    setErrmsg('')
  }
  const saveChanges = async e => {
    e.preventDefault()
    if (email !== '') {
      const response = await submitUserProfile({ email })
      if (response.success) {
        onHide(e, email)
      }
    } else {
      setErrmsg('Please enter a valid email.')
    }
  }

  return (
    <div key={props.lan}>
      <Modal show={visible} onHide={onHide} centered>
        <Modal.Header closeButton id='email_card-head'>
          <Modal.Title className={styles['body-email']}>Email</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-5'>
          <p className='mb-4 text-center'>{t('email_pop_description')}</p>
          <p className='text-muted text-smaller text-center'>
            Pss..Don't worry. we promise we won't spam you
          </p>
          <ValidationForm className='p-0' onSubmit={saveChanges}>
            <Form.Label htmlFor='inlineFormInputGroup' srOnly>
              Your email address
            </Form.Label>
            <InputGroup className={'email-input-group'}>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <img
                    src='/img/icons/email-24.svg'
                    alt=''
                    style={{ width: '15px' }}
                  />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <TextInput
                name='email'
                className='form-control'
                placeholder='Your email address'
                required
                onChange={handleEmail}
                validator={isValidEmail}
                errorMessage={{
                  validator: 'Please enter a valid email.'
                }}
              />
            </InputGroup>
            {errmsg !== '' && (
              <div style={{ color: '#dc3545', fontSize: '15px' }}>{errmsg}</div>
            )}
            <Button
              className={`${styles['foot-button']} btn-primary-filled`}
              // onClick={saveChanges}
              type='submit'
            >
              Save Changes
            </Button>
          </ValidationForm>
        </Modal.Body>
      </Modal>
    </div>
  )
}
const mapStateToProps = state => ({ lan: state.language })
// const mapDispatchToProps = {
//   submitUserProfile
// }
export default connect(mapStateToProps, null)(EmailPopUp)
