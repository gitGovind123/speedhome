import React, { useState } from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { Col, Modal, Row } from 'react-bootstrap'

import { getDataFromValue, getPropertyNameLink } from '../Common/Helper'
import {
  FURNISHING_OPTIONS,
  HOUSING_TYPE_OPTIONS,
  ROOM_TYPE_OPTIONS
} from '../Post/DB'

import { hasAdds } from '../../globalutilities/helpers'
import styles from './ShowRecommendedPropertyForChatRequest.module.scss'

const ShowRecommendedPropertyForChatRequest = props => {
  const [selectedProperty, setSelectedProperty] = useState([])
  const { t } = useTranslation('common')

  const onSelectRecommandedProperty = propertyId => {
    let tempSelectedProperty = selectedProperty
    const isExists = selectedProperty.indexOf(propertyId)
    if (isExists === -1) {
      tempSelectedProperty.push(propertyId)
    } else {
      tempSelectedProperty.splice(isExists, 1)
    }
    setSelectedProperty(tempSelectedProperty)
  }

  const onSubmitChatRequest = () => {
    props.submitMultipleChatRequest(selectedProperty)
  }

  const { handleClose, isOpen, isSuccess, recommendedProperties } = props

  return (
    <React.Fragment>
      <Modal
        show={isOpen}
        onHide={handleClose}
        className={`propertyDetailPage ${styles['popupResponse']}`}
      >
        <Modal.Body
          className={`${styles['formBody']} ${styles['popupLayout']}`}
        >
          <div className='white-popup text-center'>
            <div
              style={{
                height: '2rem'
              }}
            >
              <button
                onClick={() => {
                  handleClose()
                }}
                title='Close (Esc)'
                type='button'
                className='mfp-close'
                style={{ color: '#000', top: '10px' }}
              >
                ×
              </button>
            </div>
            <h3 className={`user-title ${styles['padAlign']}`}>
              {isSuccess ? 'Message Sent !' : 'Something went wrong!'}{' '}
            </h3>
            <div className={`user-faces ${styles['padAlign']}`}>
              <img
                loading='lazy'
                className={styles['instantImg']}
                alt='images'
                style={{
                  width: '125px'
                }}
                src={'/img/ic_request_sent.png'}
                width='65'
              />
            </div>
            {isSuccess ? (
              <h6
                className={`${styles['padAlign']} ${styles['textHighlight']}`}
              >
                Most people enquire around 10 listings before they find their
                home!
              </h6>
            ) : (
              <h6
                className={`${styles['padAlign']} ${styles['textHighlight']}`}
              >
                Something Went wrong, please email &nbsp;
                <a href='mailto:hello@speedhome.com'>hello@speedhome.com</a>
                &nbsp;for more information
              </h6>
            )}
            <br />
            <div className={styles['chat-req-popup']}>
              <h5>People also enquired on</h5>
              <ul>
                {recommendedProperties.map((item, index) => {
                  const convertToCapitialise = str => {
                    return (
                      str
                        .toLowerCase()
                        .charAt(0)
                        .toUpperCase() + str.toLowerCase().substring(1)
                    )
                  }

                  const {
                    id,
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
                  } = item
                  return (
                    <li
                      key={index}
                      style={{
                        listStyleType: 'none'
                      }}
                    >
                      <div className={styles['pro-list']}>
                        <Row className='m-0'>
                          <Col
                            md={1}
                            className='col-xs-1 p-0'
                            style={{ display: 'flex' }}
                          >
                            <label
                              className={`${styles['checkbox']} form-group checkbox-sm checkbox-inline-sm`}
                            >
                              <input
                                type='checkbox'
                                checked={selectedProperty.indexOf(id) !== -1}
                                onChange={() => onSelectRecommandedProperty(id)}
                              />
                              <span className={styles['checkbox__icon']} />
                            </label>
                          </Col>
                          <Col
                            md={4}
                            className='col-xs-4'
                            style={{ padding: '0 10px 0 5px' }}
                          >
                            <div>
                              <img
                                loading='lazy'
                                className={styles['property-img']}
                                src={
                                  (images && images.length && images[0].url) ||
                                  ''
                                }
                                width={120}
                                height={100}
                                alt='Home Rental'
                              />
                            </div>
                          </Col>
                          <Col md={7} className='col-xs-7 p-0'>
                            <div>
                              <Link
                                href={` ${
                                  hasAdds() ? t('link_adBlock') : t('link_ads')
                                }/${getPropertyNameLink(name)}-${ref}`}
                              >
                                <a className={styles['title']} target='_blank'>
                                  {name}
                                </a>
                              </Link>
                              <div className='sub'>
                                <ul
                                  className={`${styles['features']} ${styles['features-sub']}`}
                                >
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
                                      <div className={styles['ico']}>
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
                                        ? convertToCapitialise(bathroomType)
                                        : bathroom}
                                    </div>
                                    <div className={styles['ico']}>
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
                                    <div className={styles['ico']}>
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
                          </Col>
                        </Row>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div
                className='btn-wrapper'
                style={{
                  marginTop: '1rem'
                }}
              >
                <a
                  className={`btn btn-secondary-filled btn-holder btn-curv `}
                  id='multiChatReq'
                  onClick={onSubmitChatRequest}
                  data-testId="ChatRequestSentButton"
                >
                  Send Chat Request Now
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}

export default ShowRecommendedPropertyForChatRequest
