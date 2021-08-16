import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation'
import Form from 'react-bootstrap/Form'

import {
  GENDERS,
  MONTHLY_INCOMES,
  PROFILE_NUMBEROF_PAX_OPTIONS,
  OCCUPATIONS
} from '../Post/DB'
import Select from 'react-select'
import { selectStyles } from '../../globalutilities/consts'
import { getDataFromValue } from '../Common/Helper'
import styles from './ProfileInfo.module.scss'

const TODAY = new Date()
const ProfileInfo = ({
  profile,
  isOpen,
  onClose,
  onChange,
  submitProfile,
  handleBirthDate,
  handleSelection
}) => {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      id='profileInfoModal'
      className={`custModal ${styles['profileInfoModal']}`}
      // centered
    >
      <OutsideClickHandler onOutsideClick={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Some addition questions</Modal.Title>
        </Modal.Header>
        <ValidationForm
          onSubmit={e => {
            e.preventDefault()
            submitProfile()
          }}
        >
          <Modal.Body>
            <button
              onClick={onClose}
              title='Close (Esc)'
              type='button'
              className='mfp-close'
            >
              ×
            </button>
            <div className='form-pos profile-info'>
              <div className={`form-group ${styles['form-group']}`}>
                <label htmlFor='companyName'>
                  Name of company or University
                </label>
                <TextInput
                  name='companyName'
                  id='companyName'
                  placeholder='Eg. SPEEDHOME'
                  value={profile.companyName || ''}
                  onChange={onChange}
                  className={`form-control ${styles['form-control']}`}
                  style={{
                    paddingLeft: '10px'
                  }}
                />
              </div>

              <div className={`form-group ${styles['form-group']}`}>
                <Form.Label>Type of employment</Form.Label>
                <div className='input-wrap select-wrap'>
                  <Select
                    options={OCCUPATIONS}
                    value={
                      profile && profile.contractType
                        ? getDataFromValue(OCCUPATIONS, profile.contractType)
                        : ''
                    }
                    defaultValue={
                      profile && profile.contractType
                        ? getDataFromValue(OCCUPATIONS, profile.contractType)
                        : ''
                    }
                    placeholder={'Please select one'}
                    isSearchable={false}
                    onChange={option => handleSelection('contractType', option)}
                    styles={selectStyles}
                  />
                </div>
              </div>

              <div className={`form-group ${styles['form-group']}`}>
                <Form.Label>Monthly income</Form.Label>
                <div className='input-wrap select-wrap'>
                  <Select
                    options={MONTHLY_INCOMES}
                    value={
                      profile && profile.monthlyIncome
                        ? getDataFromValue(
                            MONTHLY_INCOMES,
                            profile.monthlyIncome
                          )
                        : ''
                    }
                    defaultValue={
                      profile && profile.monthlyIncome
                        ? getDataFromValue(
                            MONTHLY_INCOMES,
                            profile.monthlyIncome
                          )
                        : ''
                    }
                    placeholder={'Please select one'}
                    isSearchable={false}
                    onChange={option =>
                      handleSelection('monthlyIncome', option)
                    }
                    styles={selectStyles}
                  />
                </div>
              </div>

              <div className={`form-group ${styles['form-group']}`}>
                <Form.Label>Number of Pax</Form.Label>
                <div className='input-wrap select-wrap'>
                  <Select
                    options={PROFILE_NUMBEROF_PAX_OPTIONS}
                    value={
                      profile && profile.paxNumber
                        ? getDataFromValue(
                            PROFILE_NUMBEROF_PAX_OPTIONS,
                            profile.paxNumber
                          )
                        : ''
                    }
                    defaultValue={
                      profile && profile.paxNumber
                        ? getDataFromValue(
                            PROFILE_NUMBEROF_PAX_OPTIONS,
                            profile.paxNumber
                          )
                        : ''
                    }
                    placeholder={'Please select one'}
                    isSearchable={false}
                    onChange={option => handleSelection('paxNumber', option)}
                    styles={selectStyles}
                  />
                </div>
              </div>

              <div className={`form-group ${styles['form-group']}`}>
                <label htmlFor='reasonForMove'>Reason for move</label>
                <TextInput
                  name='reasonForMove'
                  id='reasonForMove'
                  placeholder='Eg. Nearer to office'
                  value={profile.reasonForMove || ''}
                  onChange={onChange}
                  style={{
                    paddingLeft: '10px'
                  }}
                  className={`form-control ${styles['form-control']}`}
                />
              </div>

              <div className='row'>
                <div
                  className={`col-md-7 form-group ${styles['form-group-two']} additional-info`}
                >
                  <label htmlFor='dob'>Date of birth</label>
                  <DatePicker
                    selected={(profile.dob && Date.parse(profile.dob)) || ''}
                    onChange={handleBirthDate}
                    maxDate={new Date()}
                    dateFormat='dd/MM/yyyy'
                    placeholderText='dd/mm/yyyy'
                    showYearDropdown={true}
                    showMonthDropdown={true}
                    disabledDays={{ before: TODAY }}
                  />
                </div>

                <div
                  className={`col-md-5 form-group ${styles['form-group-two']}`}
                >
                  <Form.Label>Gender</Form.Label>
                  <div className='input-wrap select-wrap'>
                    <Select
                      options={GENDERS}
                      value={
                        profile && profile.gender
                          ? getDataFromValue(GENDERS, profile.gender)
                          : ''
                      }
                      defaultValue={
                        profile && profile.gender
                          ? getDataFromValue(GENDERS, profile.gender)
                          : ''
                      }
                      onChange={option => handleSelection('gender', option)}
                      placeholder={'select'}
                      isSearchable={false}
                      styles={selectStyles}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ paddingBottom: '1rem' }}>
            <button id='btnSubmitChatProfile' type='submit' className='btn'>
              Save and exit
            </button>
          </Modal.Footer>
        </ValidationForm>
      </OutsideClickHandler>
    </Modal>
  )
}

export default ProfileInfo
