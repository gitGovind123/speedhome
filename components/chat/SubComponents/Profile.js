import React, { useState, useEffect } from 'react'
import { ArrowBackIos } from '@material-ui/icons'
import {
  getUserId,
  getBackendChatConversationId,
  priceSplit
} from '../../../globalutilities/helpers'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

import { getPropertyInfo, getProfileDetails } from '../../../actions/chatAction'
import CancleIcon from '@material-ui/icons/CancelRounded'
import ReactTooltip from 'react-tooltip'

import Link from 'next/link'
import { getDataFromValue, getPropertyNameLink } from '../../Common/Helper'
import {
  FURNISHING_OPTIONS,
  HOUSING_TYPE_OPTIONS,
  ROOM_TYPE_OPTIONS
} from '../../Post/DB'
import { hasAdds } from '../../../globalutilities/helpers'
import { ClipLoader } from 'react-spinners'
import withSizes from 'react-sizes'

import { MAP_API_KEY } from '../../../env'
import { Modal } from 'react-bootstrap'

import useTranslation from 'next-translate/useTranslation'

const Profile = props => {
  const { isMobile, styles } = props

  const [chatRequestInfo, setChatRequestInfo] = useState(null)
  const [propertyData, setPropertyData] = useState(null)
  const [isLandlord, setIsLandlord] = useState(false)
  const [income, setIncome] = useState('')
  const [userData, setUserData] = useState(null)
  // const [opponentUserData, setOpponentUserData] = useState(null)
  const [tooltipShow, setTooltipShow] = useState(false)

  const { t } = useTranslation('common')

  useEffect(() => {
    if (props.selectedUserInfo && props.selectedUserInfo.name === 'Alicia') {
      setUserData(props.selectedUserInfo)
    } else {
      getInitialProfileData()
    }
  }, [props.activeChat])

  useEffect(() => {
    if (props.selectedUserInfo) {
      if (props.selectedUserInfo.name === 'Alicia') {
        setUserData(props.selectedUserInfo)
      } else {
        getInitialProfileData()
      }
    }
  }, [props.selectedUserInfo])

  const getInitialProfileData = () => {
    if (props.activeChat) {
      const conversationId = getBackendChatConversationId(props.activeChat)
      if (conversationId) {
        getPropertyInfoMethod(conversationId)
      }
    }
  }
  const getPropertyInfoMethod = conversationId => {
    getPropertyInfo(conversationId).then(json => {
      setChatRequestInfo(
        json.data && json.data.chatRequestInfoDto
          ? json.data.chatRequestInfoDto
          : null
      )
      setPropertyData(
        json.data && json.data.property ? json.data.property : null
      )

      const mainUserId = getUserId() || ''
      let isLoggedInUserIsLandlord = false
      let specificUserId = ''
      if (
        props.selectedUserInfo &&
        props.selectedUserInfo.specificUserFromMessageLink
      ) {
        specificUserId = props.selectedUserInfo.backendUserId
      }
      if (
        props.selectedUserInfo &&
        props.selectedUserInfo.specificUserFromMessageLink
      ) {
        specificUserId = props.selectedUserInfo.backendUserId
      }
      if (
        parseInt(mainUserId) ===
        parseInt(
          specificUserId || (json.data && json.data.user && json.data.user.id)
        )
      ) {
        isLoggedInUserIsLandlord = true
      }

      if (isLoggedInUserIsLandlord) {
        setIsLandlord(true)

        getUserData(
          specificUserId ||
            (json.data.property &&
              json.data.property.user &&
              json.data.property.user.id)
        )
      } else {
        setIsLandlord(false)

        getUserData(
          specificUserId || (json.data && json.data.user && json.data.user.id)
        )
      }
    })
  }
  const getUserData = userId => {
    getProfileDetails(userId).then(json => {
      if (json.data && json.data.monthlyIncome) {
        if (json.data.monthlyIncome === 1999) {
          setIncome('Less than 2k')
        } else if (json.data.monthlyIncome === 2000) {
          setIncome('2k - 4k')
        } else if (json.data.monthlyIncome === 4000) {
          setIncome('4k - 8k')
        } else if (json.data.monthlyIncome === 8000) {
          setIncome('More than 8k')
        }
      }
      setUserData(json.data)
    })
  }

  const convertToCapitialise = str => {
    return (
      str
        .toLowerCase()
        .charAt(0)
        .toUpperCase() + str.toLowerCase().substring(1)
    )
  }
  const getUserImg = () => {
    let userImg = '/img/avatar-circle.svg'
    if (userData && userData.name === 'Alicia') {
      userImg = '/img/alicia_icon.png'
    } else {
      userImg = (userData && userData.avatar) || '/img/avatar-circle.svg'
    }
    return userImg
  }

  const onClickTooltip = () => {
    if (isMobile) {
      setTooltipShow(true)
    } else {
      setTooltipShow(false)
    }
  }

  const handleClose = () => {
    setTooltipShow(false)
  }

  const {
    name,
    type,
    sqft,
    price,
    carpark,
    bedroom,
    bathroom,
    furnishType,
    roomType,
    bathroomType,
    images,
    ref
  } = propertyData || {}

  let hrefUrl = ''
  let imgInMapUrl = ''
  // get map image url if propertyData exists
  if (Object.keys(propertyData || {}).length) {
    const lat = propertyData.latitude
    const lon = propertyData.longitude
    hrefUrl = 'https://www.google.com/maps?z=12&t=m&q=' + lat + ',' + lon

    imgInMapUrl =
      'https://maps.googleapis.com/maps/api/staticmap?center=' +
      lat +
      ',' +
      lon +
      '&zoom=14&size=1024x300&maptype=roadmap&markers=icon:https://speedhome.com/static/img/logo.png%7Clabel:S%7C' +
      lat +
      ',' +
      lon +
      `&key=${MAP_API_KEY}`
  }

  return (
    <div
      style={{
        height: '100%'
      }}
    >
      <div className={styles['profile']}>
        <div
          className={styles['top']}
          style={{ alignItems: `${!isMobile ? 'flex-end' : 'flex-start'}` }}
        >
          <a onClick={props.closeProfileSideBar}>
            {isMobile ? (
              <>
                <ArrowBackIos className={styles['icon']} />
                Back
              </>
            ) : (
              <CancleIcon className={styles['icon']} />
            )}
          </a>
        </div>
        <div className={styles['profile__body']}>
          {userData ? (
            <div className={styles['profile__card']}>
              <div className={styles['profile_info_container']}>
                <div className={styles['profile_avatar_container']}>
                  <img
                    loading='lazy'
                    className={styles['profile_img']}
                    src={getUserImg()}
                    onError={e => {
                      e.target.onerror = null
                      e.target.src = '/img/avatar-circle.svg'
                    }}
                  />
                  <div className={styles['profile_name_container']}>
                    <h6 style={{ backgroundColor: '#fff', width: '100%' }}>
                      {userData && userData.name ? userData.name : ''}
                      {userData &&
                      userData.stats &&
                      userData.stats.documentVerified ? (
                        <img
                          src={'/img/verifyIcon_green.png'}
                          alt='Verify Icon'
                          style={{ width: '20px', marginLeft: '5px' }}
                          onClick={() => onClickTooltip()}
                          data-tip
                          data-for={`profile__tooltip`}
                          data-scroll-hide='false'
                          data-event='click'
                        />
                      ) : null}
                    </h6>
                    {!isMobile && (
                      <ReactTooltip
                        id={`profile__tooltip`}
                        className={styles['profile__tooltip']}
                        place='bottom'
                        effect='solid'
                        multiline={true}
                        globalEventOff='click'
                        isCapture='true'
                      >
                        <div className={styles['info']}>
                          <p>
                            Ronald has completed Zero Deposit Eligibility check
                            and has passed
                          </p>
                        </div>
                      </ReactTooltip>
                    )}

                    <Modal
                      show={tooltipShow && isMobile}
                      className={styles['plan_tooltip_mobile']}
                    >
                      <Modal.Body
                        className={`formBody ${styles['popupLayout']}`}
                      >
                        <div>
                          <button
                            onClick={() => handleClose()}
                            title='Close (Esc)'
                            type='button'
                            className='close'
                          >
                            ×
                          </button>

                          <p
                            className='modal-content'
                            style={{
                              fontSize: '14px'
                            }}
                          >
                            Ronald has completed Zero Deposit Eligibility check
                            and has passed
                          </p>
                        </div>
                      </Modal.Body>
                    </Modal>

                    <h6 style={{ backgroundColor: '#fff', width: '100%' }}>
                      {userData && userData.name !== 'Alicia' ? (
                        <span
                          style={{ color: '#A2A2A2', backgroundColor: '#fff' }}
                        >
                          {isLandlord ? 'Landlord' : 'Tenant'} <br />
                          {isLandlord && userData.stats && (
                            <span style={{ fontSize: '12px' }}>
                              Typically Replies ({userData.stats.responseSpeed})
                            </span>
                          )}
                          {!isLandlord && userData.stats && (
                            <span style={{ fontSize: '12px' }}>
                              Typically Replies ({userData.stats.responseSpeed})
                            </span>
                          )}
                        </span>
                      ) : (
                        <span
                          style={{ color: '#A2A2A2', backgroundColor: '#fff' }}
                        >
                          Support
                        </span>
                      )}
                    </h6>
                  </div>
                </div>
                <div className={styles['profile_detailsDiv']}>
                  <h6 style={{ color: '#A2A2A2' }}>
                    {userData && userData.name === 'Alicia'
                      ? 'Contact Details'
                      : 'Personal Info'}
                  </h6>
                  <ul className={styles['profile_info_list']}>
                    {userData.cityOfLiving ? (
                      <li className={styles['profile_info_list--item']}>
                        <span className={styles['tag']}>Location</span>
                        <span>{userData.cityOfLiving}</span>
                      </li>
                    ) : null}
                    {userData.country ? (
                      <li className={styles['profile_info_list--item']}>
                        <span className={styles['tag']}>Nationality</span>
                        <span>{userData.country}</span>
                      </li>
                    ) : null}
                    {userData.dob ? (
                      <li className={styles['profile_info_list--item']}>
                        <span className={styles['tag']}>Date Of Birth</span>
                        <span>{dayjs(userData.dob).format('LL')}</span>
                      </li>
                    ) : null}
                    {userData.gender ? (
                      <li className={styles['profile_info_list--item']}>
                        <span className={styles['tag']}>Gender</span>
                        <span>{userData.gender}</span>
                      </li>
                    ) : null}
                    {userData && userData.name === 'Alicia' ? (
                      <>
                        {userData.email ? (
                          <li className={styles['profile_info_list--item']}>
                            <span className={styles['tag']}>Email</span>
                            <span>{userData.email}</span>
                          </li>
                        ) : (
                          <li className={styles['profile_info_list--item']}>
                            <span className={styles['tag']}>Email</span>
                            <span>hello@speedhome.com</span>
                          </li>
                        )}
                        {userData.phone ? (
                          <li className={styles['profile_info_list--item']}>
                            <span className={styles['tag']}>Phone</span>
                            <span>+60187777650</span>
                          </li>
                        ) : (
                          <li className={styles['profile_info_list--item']}>
                            <span className={styles['tag']}>Phone</span>
                            <span>+60187777650</span>
                          </li>
                        )}
                      </>
                    ) : null}
                  </ul>
                </div>
                {!isLandlord && userData && userData.name !== 'Alicia' ? (
                  <div className={styles['profile_detailsDiv']}>
                    <h6 style={{ color: '#A2A2A2' }}>Additional Info</h6>
                    <ul className={styles['profile_info_list']}>
                      {userData.occupation ? (
                        <li className={styles['profile_info_list--item']}>
                          <span className={styles['tag']}>Occupation</span>
                          <span>{userData.occupation}</span>
                        </li>
                      ) : null}
                      {userData.companyName ? (
                        <li className={styles['profile_info_list--item']}>
                          <span className={styles['tag']}>Employer name</span>
                          <span>{userData.companyName}</span>
                        </li>
                      ) : null}

                      {userData.contractType ? (
                        <li className={styles['profile_info_list--item']}>
                          <span className={styles['tag']}>
                            Type of employment
                          </span>
                          <span>{userData.contractType}</span>
                        </li>
                      ) : null}
                      {income ? (
                        <li className={styles['profile_info_list--item']}>
                          <span className={styles['tag']}>Monthly Income</span>
                          <span>{income}</span>
                        </li>
                      ) : null}
                      {userData.paxNumber ? (
                        <li className={styles['profile_info_list--item']}>
                          <span className={styles['tag']}>No of pax</span>
                          <span>{userData.paxNumber}</span>
                        </li>
                      ) : null}
                      {userData.reasonForMove ? (
                        <li className={styles['profile_info_list--item']}>
                          <span className={styles['tag']}>Reason for move</span>
                          <span>{userData.reasonForMove}</span>
                        </li>
                      ) : null}
                      {chatRequestInfo ? (
                        <>
                          {chatRequestInfo.movingDate ? (
                            <li className={styles['profile_info_list--item']}>
                              <span className={styles['tag']}>
                                Move in date
                              </span>
                              <span>
                                {dayjs(chatRequestInfo.movingDate).format('LL')}
                              </span>
                            </li>
                          ) : null}
                          {chatRequestInfo.tenancyDuration ? (
                            <li className={styles['profile_info_list--item']}>
                              <span className={styles['tag']}>
                                Tenancy duration{' '}
                              </span>
                              <span>{chatRequestInfo.tenancyDuration}</span>
                            </li>
                          ) : null}
                          {chatRequestInfo.budget ? (
                            <li className={styles['profile_info_list--item']}>
                              <span className={styles['tag']}>Budget </span>
                              <span>
                                RM {priceSplit(chatRequestInfo.budget)}
                              </span>
                            </li>
                          ) : null}
                        </>
                      ) : null}
                    </ul>
                  </div>
                ) : null}
                {userData && userData.name !== 'Alicia' ? (
                  <>
                    <div className={styles['chat-req-popup']}>
                      <h6 style={{ color: '#A2A2A2' }}>Listing</h6>
                      <ul>
                        {Object.keys(propertyData || {}).length ? (
                          <li style={{ listStyleType: 'none' }}>
                            <div className={styles['pro-col']}>
                              <div className='m-0 row'>
                                <div
                                  className='col-xs-4 col-md-4'
                                  style={{ padding: '0px 10px 0px 5px' }}
                                >
                                  <div>
                                    <img
                                      loading='lazy'
                                      className={styles['property-img']}
                                      src={
                                        (images &&
                                          images.length &&
                                          images[0].url) ||
                                        ''
                                      }
                                      onError={e => {
                                        e.target.onerror = null
                                        e.target.src =
                                          '/img/image-not-found.png'
                                      }}
                                      width={120}
                                      height={100}
                                      alt='Home Rental'
                                    />
                                  </div>
                                </div>
                                <div className='col-xs-8 p-0 col-md-8'>
                                  <div>
                                    <Link
                                      href={`${
                                        hasAdds()
                                          ? t('link_adBlock')
                                          : t('link_ads')
                                      }/${getPropertyNameLink(name)}-${ref}`}
                                    >
                                      <a className='title' target='_blank'>
                                        {name}
                                      </a>
                                    </Link>
                                    <div className='sub'>
                                      <ul className={styles['features']}>
                                        {type === 'ROOM' ? (
                                          <li>
                                            {
                                              getDataFromValue(
                                                ROOM_TYPE_OPTIONS,
                                                roomType
                                              ).label
                                            }
                                          </li>
                                        ) : (
                                          <li>{sqft} sqft</li>
                                        )}

                                        <li>
                                          {
                                            getDataFromValue(
                                              HOUSING_TYPE_OPTIONS,
                                              type
                                            ).label
                                          }
                                        </li>
                                        <li>
                                          {
                                            getDataFromValue(
                                              FURNISHING_OPTIONS,
                                              furnishType
                                            ).label
                                          }
                                        </li>
                                      </ul>
                                      <ul className={styles['facilities']}>
                                        {type === 'ROOM' ? null : (
                                          <li>
                                            <div className={styles['num']}>
                                              {bedroom}
                                            </div>
                                            <div className='ico'>
                                              <img
                                                loading='lazy'
                                                src={'/img/ico-bed.svg'}
                                                width={20}
                                                alt=''
                                              />
                                            </div>
                                          </li>
                                        )}

                                        <li>
                                          <div className={styles['num']}>
                                            {type === 'ROOM'
                                              ? convertToCapitialise(
                                                  bathroomType
                                                )
                                              : bathroom}
                                          </div>
                                          <div className='ico'>
                                            <img
                                              loading='lazy'
                                              src={'/img/ico-bath.svg'}
                                              width={17}
                                              alt=''
                                            />
                                          </div>
                                        </li>
                                        <li>
                                          <div className={styles['num']}>
                                            {carpark}
                                          </div>
                                          <div className='ico'>
                                            <img
                                              loading='lazy'
                                              src={'/img/ico-parking.svg'}
                                              width={17}
                                              alt=''
                                            />
                                          </div>
                                        </li>
                                      </ul>
                                      <div className={styles['price']}>
                                        RM {price}{' '}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                    {/* display map starts */}
                    {Object.keys(propertyData || {}).length ? (
                      <section className={styles['profile__location']}>
                        <h6 style={{ color: '#A2A2A2' }}>Location</h6>
                        <div className='profile__map--container'>
                          <a
                            target='_blank'
                            href={hrefUrl}
                            id='Popover1'
                            data-tip
                            data-for='location--tooltip'
                          >
                            <img loading='lazy' border='0' src={imgInMapUrl} />
                          </a>
                          <ReactTooltip
                            id='location--tooltip'
                            aria-haspopup='true'
                            role='example'
                            border
                            backgroundColor='#fff'
                            borderColor='#333'
                          >
                            <div>
                              <h5>Tips</h5>
                              <p style={{ color: '#000' }}>
                                You can click on the map to open it
                              </p>
                            </div>
                          </ReactTooltip>
                        </div>
                      </section>
                    ) : // display map ends
                    null}
                  </>
                ) : null}
              </div>
            </div>
          ) : (
            <div
              className={styles['profile__card']}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ClipLoader color='#4885ed' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 767
})

export default withSizes(mapSizesToProps)(Profile)
