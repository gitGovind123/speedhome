import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from 'react-bootstrap'
import Select from 'react-select'
import {
  ValidationForm,
  TextInput,
  SelectGroup
} from 'react-bootstrap4-form-validation'
import CheckICon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import dynamic from 'next/dynamic'

import Head from '../../Common/Head'
import { selectStyles } from '../../../globalutilities/consts'

import { getUserProfile, submitUserProfile, getList } from '../../../actions'
import {
  getBase64,
  getToken,
  getUserId
} from '../../../globalutilities/helpers'
import { countries } from '../../../globalutilities/country'

import Loader from '../../Common/Loader'
import BreadCrumb from '../../Common/BreadCrumb'
import CONST from '../../../globalutilities/consts'
import { autoLogin } from '../../../actions/authActions'
import { getDataFromValue } from '../../Common/Helper'

import 'react-datepicker/dist/react-datepicker.css'
import {
  triggerGTAG,
  isValidEmail,
  validatePhonenumber,
  triggerDengageEvents
} from '../../../utils/utils'

import FacebookLogin from 'react-facebook-login'
import FacebookIcon from '@material-ui/icons/Facebook'
import { FACEBOOK_APP_ID } from '../../../env'
import Swal from 'sweetalert2'
import UpdatePasswordModal from '../../dashboard/profile/UpdatePasswordModal'
import { resetPassword } from '../../../actions'

import {
  NUMBEROF_PROPERTIES,
  PROFILE_NUMBEROF_PAX_OPTIONS,
  EMPLOYMENT_TYPES,
  MONTHLY_INCOMES,
  GENDERS,
  EXPERIENCE_LEVELS
} from '../../dashboard/profile/profileData'

const PreDocVerify = dynamic(() =>
  import('../../dashboard/profile/PreDocVerify')
)

import styles from './Profile.module.scss'

const Profile = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasFacebookId, setHasFacebookId] = useState('')
  const [dateError, setDateError] = useState('')
  const [updatePasswordValue, setUpdatePasswordValue] = useState({
    oldPassword: '',
    newPassword: ''
  })
  const [profile, setProfile] = useState({
    avatar: '',
    country: 'Malaysia',
    email: '',
    facebookFriends: 0,
    facebookId: '',
    name: '',
    occupation: '',
    type: 0,
    phoneNumber: '',
    whatsappNumber: '',
    avatarType: '',
    companyName: ''
  })
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false)
  const [wrongPassword, setWrongPassword] = useState('')
  const [avatarType, setAvatarType] = useState('')

  const { t } = useTranslation('common')

  useEffect(() => {
    async function fetchUserProfile () {
      const result = await getUserProfile()
      if (result.success && result.data) {
        setProfile({
          ...profile,
          ...result.data
        })
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  useEffect(() => {
    if (props.user) {
      setProfile({
        ...profile,
        ...props.user
      })
      if (props.user.facebook) {
        setHasFacebookId(props.user.facebook.facebookId)
      }
    }
  }, [props.user])

  const onChange = event => {
    // eslint-disable-line
    const { name, value, checked, type } = event.target

    if (type === 'tel' && !/^\d*?$/.test(value)) return
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const dateValidate = () => {
    if (!profile.dob) {
      setDateError('Please Select dob')
    }
  }
  const onSubmit = async () => {
    delete profile.facebook
    delete profile.facebookId
    if (!avatarType) {
      delete profile.avatar
    }
    const response = await submitUserProfile(profile)
    toast(
      response.success
        ? 'Profile updated successfully.'
        : response.message || 'Something went wrong',
      {
        autoClose: CONST.ToastTimeout,
        type: response.success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR
      }
    )
    if (response.success) {
      const userId = getUserId()
      const token = getToken()
      triggerGTAG({
        event: 'User_Profile_Update',
        email: profile.email ? profile.email : '',
        phone: profile.phoneNumber ? profile.phoneNumber : '',
        name: profile.name ? profile.name : '',
        whatsappNumber: profile.whatsappNumber
          ? profile.whatsappNumber
          : profile.phoneNumber
          ? profile.phoneNumber
          : '',
        dateOfBirth: profile.dob ? profile.dob : '',
        gender: profile.gender ? profile.gender : '',
        nationality: profile.country ? profile.country : '',
        cityOfLiving: profile.cityOfLiving ? profile.cityOfLiving : '',
        userType: profile.type === 1 ? 'LANDLORD' : 'TENANT',
        occupation: profile.occupation ? profile.occupation : '',
        employerName: profile.companyName ? profile.companyName : '',
        employmentType: profile.contractType ? profile.contractType : '',
        monthlyIncome: profile.monthlyIncome ? profile.monthlyIncome : '',
        numberOfPax: profile.paxNumber ? profile.paxNumber : '',
        reasonToMove: profile.reasonForMove ? profile.reasonForMove : '',
        numberOfProperty: profile.propertiesOwned
          ? profile.propertiesOwned
          : '',
        levelExpertise: profile.experience ? profile.experience : ''
      })
      triggerDengageEvents('tt_submit_add_info', {
        event_name: 'tt_submit_add_info',
        name: profile.name ? profile.name : '',
        phone_number: profile.phoneNumber ? profile.phoneNumber : '',
        email_address: profile.email ? profile.email : '',
        monthly_income: profile.monthlyIncome ? profile.monthlyIncome : '',
        reason_of_moving: profile.reasonForMove ? profile.reasonForMove : '',
        no_of_pax: profile.paxNumber ? profile.paxNumber : ''
      })

      if (userId && token) {
        props.autoLogin(userId, token)
      }
    }
  }

  const onSelect = event => {
    const { files } = event.target
    if (files && files.length) {
      let isValidFile = null
      if (files[0].type.includes('image/jpeg')) isValidFile = true
      if (files[0].type.startsWith('image/png')) isValidFile = true
      if (!isValidFile) {
        Swal.fire({
          title: 'Invalid file for profile picture.',
          html: '<p>' + 'Only (png, jpg, jpeg) allowed' + '</p>',
          icon: 'error'
        })
        return
      }
      getBase64(files[0], avatar => {
        const splitedAvatar = avatar.split(',')
        const avatarTypeTemp = splitedAvatar[0]
        const mainAvatar = splitedAvatar[1]
        setProfile({
          ...profile,
          avatar: mainAvatar
        })
        setAvatarType(avatarTypeTemp)
      })
    }
  }

  const onTabChange = (key, value) => {
    setProfile({
      ...profile,
      [key]: value
    })
  }

  const handleBirthDate = date => {
    setDateError('')
    setProfile({
      ...profile,
      dob: date
    })
  }
  const openPassworModal = () => {
    setShowUpdatePasswordModal(true)
  }
  const closeBrowseItem = () => {
    setShowUpdatePasswordModal(false)
  }
  const onPasswordChange = () => {
    setWrongPassword('')
    const { name, value } = event.target
    const clonePasswordData = Object.assign({}, updatePasswordValue)
    clonePasswordData[name] = value
    //setWrongPassword("")
    setUpdatePasswordValue(clonePasswordData)
  }
  const submitUpdatePassword = () => {
    if (
      updatePasswordValue.oldpassword.length > 5 &&
      updatePasswordValue.newpassword.length > 5
    ) {
      const data = {
        oldPassword: updatePasswordValue.oldpassword,
        newPassword: updatePasswordValue.newpassword
      }
      resetPassword(data).then(resp => {
        if (resp.success) {
          setShowUpdatePasswordModal(false)
        } else {
          setWrongPassword(resp.message)
        }
      })
    } else {
      alert('Something Went Wrong')
    }
  }

  const handleSelection = (key, option) => {
    setProfile({
      ...profile,
      [key]: option
    })
  }
  const handleDateChangeRaw = e => {
    e.preventDefault()
  }
  const responseFacebook = async fbRes => {
    let cloneProfile = Object.assign({}, profile)

    cloneProfile.facebookId = fbRes.id ? fbRes.id : ''
    cloneProfile.fbAccessToken = fbRes.accessToken ? fbRes.accessToken : ''
    cloneProfile.name = cloneProfile.name ? cloneProfile.name : fbRes.name
    cloneProfile.email = cloneProfile.email ? cloneProfile.email : fbRes.name

    if (!avatarType) {
      delete cloneProfile.avatar
    }
    const response = await submitUserProfile(cloneProfile)
    toast(
      response.success
        ? 'Profile updated successfully.'
        : response.message || 'Something went wrong',
      {
        autoClose: CONST.ToastTimeout,
        type: response.success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR
      }
    )
    if (response.success) {
      const userId = getUserId()
      const token = getToken()
      triggerGTAG({
        event: 'User_Profile_Update',
        email: profile.email ? profile.email : '',
        phone: profile.phoneNumber ? profile.phoneNumber : '',
        name: profile.name ? profile.name : '',
        whatsappNumber: profile.whatsappNumber
          ? profile.whatsappNumber
          : profile.phoneNumber
          ? profile.phoneNumber
          : '',
        dateOfBirth: profile.dob ? profile.dob : '',
        gender: profile.gender ? profile.gender : '',
        nationality: profile.country ? profile.country : '',
        cityOfLiving: profile.cityOfLiving ? profile.cityOfLiving : '',
        userType: profile.type === 1 ? 'LANDLORD' : 'TENANT',
        occupation: profile.occupation ? profile.occupation : '',
        employerName: profile.companyName ? profile.companyName : '',
        employmentType: profile.contractType ? profile.contractType : '',
        monthlyIncome: profile.monthlyIncome ? profile.monthlyIncome : '',
        numberOfPax: profile.paxNumber ? profile.paxNumber : '',
        reasonToMove: profile.reasonForMove ? profile.reasonForMove : '',
        numberOfProperty: profile.propertiesOwned
          ? profile.propertiesOwned
          : '',
        levelExpertise: profile.experience ? profile.experience : ''
      })
      if (userId && token) {
        props.autoLogin(userId, token)
      }
    }
  }
  const unlikFb = async () => {
    let cloneProfile = Object.assign({}, profile)
    cloneProfile.facebookId = '0'
    if (!avatarType) {
      delete cloneProfile.avatar
    }
    const response = await submitUserProfile(cloneProfile)
    toast(
      response.success
        ? 'Profile updated successfully.'
        : response.message || 'Something went wrong',
      {
        autoClose: CONST.ToastTimeout,
        type: response.success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR
      }
    )
    if (response.success) {
      const userId = getUserId()
      const token = getToken()
      triggerGTAG({
        event: 'User_Profile_Update',
        email: profile.email ? profile.email : '',
        phone: profile.phoneNumber ? profile.phoneNumber : '',
        name: profile.name ? profile.name : '',
        whatsappNumber: profile.whatsappNumber ? profile.whatsappNumber : '',
        dateOfBirth: profile.dob ? profile.dob : '',
        gender: profile.gender ? profile.gender : '',
        nationality: profile.country ? profile.country : '',
        cityOfLiving: profile.cityOfLiving ? profile.cityOfLiving : '',
        userType: profile.type === 1 ? 'LANDLORD' : 'TENANT',
        occupation: profile.occupation ? profile.occupation : '',
        employerName: profile.companyName ? profile.companyName : '',
        employmentType: profile.contractType ? profile.contractType : '',
        monthlyIncome: profile.monthlyIncome ? profile.monthlyIncome : '',
        numberOfPax: profile.paxNumber ? profile.paxNumber : '',
        reasonToMove: profile.reasonForMove ? profile.reasonForMove : '',
        numberOfProperty: profile.propertiesOwned
          ? profile.propertiesOwned
          : '',
        levelExpertise: profile.experience ? profile.experience : ''
      })

      if (userId && token) {
        props.autoLogin(userId, token)
      }
    }
  }
  const componentClicked = () => {}

  return (
    <React.Fragment>
      <ToastContainer />
      <Head title={t('profile_title')} />
      <main id='main' className='inner-pages'>
        <BreadCrumb breadCrumb={CONST.dashboardProfile} />
        <div className='page-main-title user-main-title'>
          <div className='container'>
            <h1>{t('text_dashboard_profile')}</h1>
            <a className='close' href={'/dashboard'}>
              <CloseIcon />
              {/* <i className='fas fa-times' /> */}
            </a>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='container'>
            <ValidationForm
              onSubmit={e => {
                e.preventDefault()
                onSubmit()
              }}
              onErrorSubmit={e => {
                e.preventDefault()
                dateValidate()
              }}
            >
              <div className={styles['profile-slot']}>
                <div
                  style={{
                    marginBottom: '1rem'
                  }}
                >
                  {hasFacebookId && parseInt(hasFacebookId) !== 0 ? (
                    <div className={styles['my-facebook-button-class']}>
                      <span
                        style={{
                          color: '#fff',
                          backgroundColor: '#3b5998',
                          borderRadius: '4px'
                        }}
                      >
                        Linked With Facebook <CheckICon />
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          borderBottom: '1px dashed',
                          cursor: 'pointer',
                          marginLeft: '1rem'
                        }}
                        onClick={() => unlikFb()}
                      >
                        Click here to unlink facebook
                      </span>
                    </div>
                  ) : (
                    <FacebookLogin
                      appId={FACEBOOK_APP_ID}
                      autoLoad={false}
                      callback={responseFacebook}
                      onClick={componentClicked}
                      fields='name,email,picture'
                      cssClass={styles['my-facebook-button-class']}
                      icon={
                        <FacebookIcon
                          style={{
                            marginRight: '.5rem',
                            height: '1.2rem',
                            width: '1.2rem'
                          }}
                        />
                      }
                      textButton='Link With Facebook'
                      disableMobileRedirect={true}
                      isMobile={false}
                    />
                  )}
                </div>
                <div className='row'>
                  <div className='col-md-6 two'>
                    <div
                      className={`${styles['form-group']} ${styles['propertyName']}`}
                    >
                      <label htmlFor='propertyName'>
                        {t('text_dashboard_profile_name')}
                      </label>
                      <TextInput
                        name='name'
                        id='name'
                        required
                        value={profile.name}
                        onChange={onChange}
                      />
                    </div>
                    <div className={styles['form-group']}>
                      <label htmlFor='propertyName'>
                        {' '}
                        {t('text_dashboard_profile_email')}{' '}
                      </label>
                      <TextInput
                        name='email'
                        type='email'
                        id='email'
                        required
                        value={profile.email}
                        validator={isValidEmail}
                        onChange={onChange}
                        errorMessage={{
                          validator: 'Please enter a valid email.'
                        }}
                      />
                    </div>
                  </div>
                  <div className='col-md-6 one'>
                    <div
                      className={styles['form-group']}
                      style={{
                        paddingTop: 17
                      }}
                    >
                      <div
                        className='avatar'
                        style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <div
                          className={styles['circle']}
                          style={{
                            backgroundImage: `url(${
                              avatarType
                                ? `${avatarType},${profile.avatar}`
                                : (profile && profile.avatar) ||
                                  '/img/upload-photo.png'
                            })`
                          }}
                        >
                          <label className={styles['upload-options-avatar']}>
                            <input
                              name='avatar'
                              type='file'
                              className='image-upload-avatar'
                              accept='image/*'
                              onChange={onSelect}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6'>
                    <div className={styles['form-group']}>
                      <label htmlFor='postCode'>
                        {t('text_dashboard_profile_phone_number')}
                      </label>
                      <TextInput
                        name='phoneNumber'
                        type='number'
                        id='phoneNumber'
                        required
                        disabled
                        value={profile.phoneNumber || ''}
                        onChange={onChange}
                        validator={validatePhonenumber}
                        errorMessage={{
                          validator: 'Please enter valid Mobile Number.'
                        }}
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className={styles['form-group']}>
                      <label htmlFor='postCode'>
                        {t('text_dashboard_profile_whatsapp_number')}
                      </label>
                      <TextInput
                        name='whatsappNumber'
                        type='tel'
                        id='whatsappNumber'
                        required
                        pattern='\d*'
                        value={
                          profile.whatsappNumber ? profile.whatsappNumber : ''
                        }
                        onChange={onChange}
                        validator={validatePhonenumber}
                        errorMessage={{
                          validator: 'Please enter valid Mobile Number.'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6 form-group'>
                    <label htmlFor='dob'>Date of birth</label>
                    <div>
                      <DatePicker
                        className='form-control'
                        id='dob'
                        name='dob'
                        required
                        // value={(profile.dob && dayjs(Date.parse(profile.dob)).format("MM/DD/YYYY")) || ""}
                        selected={
                          (profile.dob && Date.parse(profile.dob)) || ''
                        }
                        onChange={handleBirthDate}
                        maxDate={new Date()}
                        showYearDropdown={true}
                        showMonthDropdown={true}
                        dropdownMode='select'
                        disabledKeyboardNavigation
                        placeholderText='dd/mm/yyyy'
                        dateFormat='dd/MM/yyyy'
                        autoComplete='off'
                        utcOffset={8}
                        disabledDays={{ before: new Date() }}
                        onChangeRaw={handleDateChangeRaw}
                      />
                      {dateError ? (
                        // if(dateError){
                        // return(
                        <span style={{ color: '#dc3545', fontSize: '80%' }}>
                          This field is required{' '}
                        </span>
                      ) : null
                      // )
                      // }
                      }
                    </div>
                  </div>
                  <div className='col-md-6 form-group'>
                    <div className='selectGroup'>
                      <Form.Label>Gender</Form.Label>
                      <div className='input-wrap select-wrap select-group-wrap'>
                        <SelectGroup
                          value={profile.gender}
                          required
                          errorMessage='Please select a gender.'
                          onChange={option =>
                            handleSelection('gender', option.target.value)
                          }
                          placeholder='Please select one'
                          isSearchable={false}
                          containerStyle={{
                            height: '54px'
                          }}
                        >
                          <option disable value=''>
                            Please select gender
                          </option>
                          {GENDERS.map(gender => (
                            <option value={gender.value}>{gender.label}</option>
                          ))}
                        </SelectGroup>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6'>
                    <div className={styles['form-group']}>
                      <label htmlFor='postCode'>Nationality</label>
                      <div className='input-wrap select-wrap'>
                        <SelectGroup
                          name='country'
                          value={profile.country}
                          defaultValue={profile.country || 'Malaysia'}
                          styles={selectStyles}
                          onChange={option =>
                            handleSelection('country', option.target.value)
                          }
                          required
                          errorMessage='Please select a Country.'
                          isSearchable={false}
                        >
                          <option disable value=''>
                            Please select one
                          </option>
                          {countries.map(country => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </SelectGroup>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className={styles['form-group']}>
                      <label htmlFor='cityOfLiving'>Location</label>
                      <TextInput
                        type='text'
                        name='cityOfLiving'
                        id='cityOfLiving'
                        placeholder='City Of Living'
                        value={profile.cityOfLiving || ''}
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className={styles['form-group']}>
                      <label htmlFor='referrel'>Referred By</label>
                      <TextInput
                        readOnly
                        id='referrel'
                        value={
                          profile.referredBy
                            ? profile.referredBy.name == null
                              ? profile.referredBy.referrerCode
                              : profile.referredBy.name
                            : ' - '
                        }
                      />
                    </div>
                  </div>
                </div>

                <br />

                <div className='row'>
                  {props.user && props.user.passwordSet ? (
                    <div className='col-md-12' style={{ textAlign: 'center' }}>
                      <div
                        className={`${styles['ownerOfUnit']} ${styles['form-group']}`}
                      >
                        <h3>Password</h3>
                        <div className='password-container'>
                          <a
                            onClick={() => openPassworModal()}
                            className='btn btn-curv btn-primary'
                            style={{
                              fontWeight: '400px',
                              color: '#fff',
                              fontSize: '16px',
                              background: 'rgb(72, 133, 237)',
                              textAlign: 'center'
                            }}
                          >
                            Change Password
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className='row'>
                  <div className='col-md-12'>
                    <div
                      className={`${styles['ownerOfUnit']} ${styles['form-group']}`}
                    >
                      <h3>Additional info</h3>
                    </div>

                    <div className={styles['radio-tab']}>
                      <a
                        id='btnLandlord'
                        name='type'
                        data-value={0}
                        className={
                          parseInt(profile.type, 10) === 0
                            ? `${styles['landlord']} ${styles['active']}`
                            : styles['inactive-landloard']
                        }
                        onClick={() => onTabChange('type', 0)}
                      >
                        {t('text_dashboard_profile_landlord')}
                      </a>
                      <a
                        id='btnTenant'
                        name='type'
                        data-value={1}
                        className={
                          parseInt(profile.type, 10) === 1
                            ? `${styles['tenant']} ${styles['active']}`
                            : styles['inactive-tenant']
                        }
                        onClick={() => onTabChange('type', 1)}
                      >
                        {t('text_dashboard_profile_tenant')}
                      </a>
                    </div>
                  </div>
                </div>
                <br />
                {profile.type === 1 ? (
                  <div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className={styles['form-group']}>
                          <label htmlFor='postCode'>Occupation</label>
                          <TextInput
                            type='text'
                            name='occupation'
                            id='occupation'
                            value={profile.occupation || ''}
                            onChange={onChange}
                          />
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className={styles['form-group']}>
                          <label htmlFor='companyName'>
                            Employer Name (University Name if student)
                          </label>
                          <div className='input-wrap select-wrap'>
                            <TextInput
                              type='text'
                              name='companyName'
                              id='companyName'
                              value={profile.companyName || ''}
                              placeholder='Employer Name'
                              onChange={onChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className={styles['form-group']}>
                          <label htmlFor='contractType'>
                            Type of employment
                          </label>
                          <div className='input-wrap select-wrap'>
                            <Select
                              name='contractType'
                              value={getDataFromValue(
                                EMPLOYMENT_TYPES,
                                profile.contractType || ''
                              )}
                              defaultValue={getDataFromValue(
                                EMPLOYMENT_TYPES,
                                profile.contractType || ''
                              )}
                              options={EMPLOYMENT_TYPES}
                              styles={selectStyles}
                              placeholder='Please select one'
                              isSearchable={false}
                              onChange={val =>
                                setProfile({
                                  ...profile,
                                  contractType: val.value
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className={styles['form-group']}>
                          <label htmlFor='monthlyIncome'>Monthly Income</label>
                          <div className='input-wrap select-wrap'>
                            <Select
                              name='monthlyIncome'
                              value={getDataFromValue(
                                MONTHLY_INCOMES,
                                profile.monthlyIncome
                              )}
                              defaultValue={getDataFromValue(
                                MONTHLY_INCOMES,
                                profile.monthlyIncome
                              )}
                              options={MONTHLY_INCOMES}
                              styles={selectStyles}
                              placeholder='Please select one'
                              isSearchable={false}
                              onChange={val =>
                                setProfile({
                                  ...profile,
                                  monthlyIncome: val.value
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className={styles['form-group']}>
                          <label htmlFor='paxNumber'>No of Pax</label>
                          <div className='input-wrap select-wrap'>
                            <Select
                              name='paxNumber'
                              value={getDataFromValue(
                                PROFILE_NUMBEROF_PAX_OPTIONS,
                                profile.paxNumber
                              )}
                              defaultValue={getDataFromValue(
                                PROFILE_NUMBEROF_PAX_OPTIONS,
                                profile.paxNumber
                              )}
                              options={PROFILE_NUMBEROF_PAX_OPTIONS}
                              styles={selectStyles}
                              placeholder='Please select one'
                              isSearchable={false}
                              onChange={val =>
                                setProfile({
                                  ...profile,
                                  paxNumber: val.value
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className={styles['form-group']}>
                          <label htmlFor='reasonForMove'>Reason for move</label>
                          <div className='input-wrap select-wrap'>
                            <TextInput
                              name='reasonForMove'
                              type='text'
                              id='reasonForMove'
                              value={profile.reasonForMove || ''}
                              onChange={onChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className={styles['form-group']}>
                        <label htmlFor='propertiesOwned'>
                          How many properties?
                        </label>
                        <div className='input-wrap select-wrap'>
                          <Select
                            name='propertiesOwned'
                            value={getDataFromValue(
                              NUMBEROF_PROPERTIES,
                              profile.propertiesOwned
                            )}
                            defaultValue={getDataFromValue(
                              NUMBEROF_PROPERTIES,
                              profile.propertiesOwned
                            )}
                            options={NUMBEROF_PROPERTIES}
                            styles={selectStyles}
                            isSearchable={false}
                            placeholder='Please select one'
                            isSearchable={false}
                            onChange={val => {
                              const cloneProfile = Object.assign({}, profile)
                              cloneProfile.propertiesOwned = val.value

                              setProfile(cloneProfile)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className={styles['form-group']}>
                        <label htmlFor='experience'>
                          Level of your expertise with real estate?{' '}
                        </label>
                        <div className='input-wrap select-wrap'>
                          <Select
                            name='experience'
                            value={getDataFromValue(
                              EXPERIENCE_LEVELS,
                              profile.experience
                            )}
                            defaultValue={getDataFromValue(
                              EXPERIENCE_LEVELS,
                              profile.experience
                            )}
                            options={EXPERIENCE_LEVELS}
                            styles={selectStyles}
                            isSearchable={false}
                            placeholder='Please select one'
                            isSearchable={false}
                            onChange={val => {
                              const cloneProfile = Object.assign({}, profile)
                              cloneProfile.experience = val.value
                              setProfile(cloneProfile)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className='btn-save'>
                <Button
                  type='submit'
                  className='btn btn-warning btn-curv profile-save-btn'
                >
                  Save
                </Button>
              </div>
            </ValidationForm>
            <br />
            <br />
            <br />
            <PreDocVerify />
            <br />
            {showUpdatePasswordModal ? (
              <UpdatePasswordModal
                closeBrowseItem={closeBrowseItem}
                onPasswordChange={onPasswordChange}
                submitUpdatePassword={submitUpdatePassword}
                wrongPassword={wrongPassword}
              />
            ) : null}
          </div>
        )}
      </main>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    language: state.language,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => ({
  getList: payload => dispatch(getList(payload)),
  autoLogin: (userId, token) => dispatch(autoLogin(userId, token))
})

export async function getServerSideProps () {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
