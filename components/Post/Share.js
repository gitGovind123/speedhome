import React, { useRef, useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Link from 'next/link'

import { ValidationForm } from 'react-bootstrap4-form-validation'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'

import Head from '../Common/Head'
import BreadCrumb from '../Common/BreadCrumb'
import CONST from '../../globalutilities/consts'
import Headline from './Headline'
import useTranslation from 'next-translate/useTranslation'

import { getDataFromValue, getPropertyNameLink } from '../Common/Helper'
import {
  HOUSING_TYPE_OPTIONS,
  ROOM_TYPE_OPTIONS,
  FURNISHING_OPTIONS
} from './DB'

import Icon from '../Common/Icons/Icons'

import { hasAdds } from '../../globalutilities/helpers'
import { triggerGTAG } from '../../utils/utils'
import styles from './Share.module.scss'

const PostShare = props => {
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
    images
  } = props.propertyDetail

  const [show, setShow] = useState(false)
  const [shareableUrl, setShareableUrl] = useState('')
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
  }

  const [copySuccess, setCopySuccess] = useState('')
  const textAreaRef = useRef(null)
  const { t } = useTranslation('common')
  useEffect(() => {
    let propertyDetailsLink = ''
    if (props.router.locale === 'en') {
      propertyDetailsLink = hasAdds() ? '/details' : '/ads'
    } else if (props.router.locale === 'my') {
      propertyDetailsLink = '/iklan'
    } else if (props.router.locale === 'zh') {
      propertyDetailsLink = '/guanggao'
    }

    const propertyLink = `${propertyDetailsLink}/${getPropertyNameLink(
      props.propertyDetail.name
    )}-${props.propertyDetail.ref}`

    const fullShareAbleLink = `${window.location.origin}${propertyLink}`
    setShareableUrl(fullShareAbleLink)
  }, [props.propertyDetail])

  const copyToClipboard = e => {
    textAreaRef.current.select()
    document.execCommand('copy')
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus()
    setCopySuccess('Copied!')
    triggerSubmitShareGTAG()
  }

  const convertToCapitialise = str => {
    return (
      str
        .toLowerCase()
        .charAt(0)
        .toUpperCase() + str.toLowerCase().substring(1)
    )
  }

  const triggerSubmitShareGTAG = () => {
    triggerGTAG({
      event: 'clickCreateListingShare'
    })
  }

  const triggerSkipShareGTAG = () => {
    triggerGTAG({
      event: 'clickCreateListingSkipShare'
    })
  }

  const coverPhoto = (images && images.find(img => img.coverPhoto)) || {}

  return (
    <ValidationForm>
      <section className={styles['post_page_share']}>
        <Head
          title={'Post a Property to Find Tenants | SPEEDHOME'}
          description={
            'Are you looking for a tenant for your property? Let SPEEDHOME speed up the process of finding the best tenant and make you a landlord. Fill out out the form, takes up only minutes.'
          }
          coverpicture={(coverPhoto && coverPhoto.url) || null}
        />
        <BreadCrumb breadCrumb={CONST.postPageShare} />
        <Container>
          {/*<Headline*/}
          {/*title={t('post:text_post_share_listing')}*/}
          {/*link={'/post/thanks'}*/}
          {/*/>*/}
          <div style={{ marginTop: '4rem' }}>
            <Row>
              <Col md={12}>
                <div className={`create-listing  ${'share-listing'}`}>
                  <div className={`${styles['pro-col']} ${styles['pro-list']}`}>
                    <div className={styles['inner']}>
                      <div
                        className={`${styles['img']} ${styles['product-thumb']}`}
                      >
                        <img
                          loading='lazy'
                          src={images[0].url}
                          width={300}
                          alt='Home Rental'
                        />
                      </div>
                      <div className={styles['des']}>
                        <h2 className={styles['pro-title']}>
                          <span className={styles['text']}>{name}</span>
                        </h2>
                        <div className={styles['price']}>RM {price}</div>
                        <div className={styles['sub']}>
                          <ul
                            className={styles['features-sub']}
                            style={{ display: 'flex' }}
                          >
                            {type === 'ROOM' ? (
                              <li>
                                {
                                  getDataFromValue(ROOM_TYPE_OPTIONS, roomType)
                                    .label
                                }
                              </li>
                            ) : (
                              <li>{sqft} sqft</li>
                            )}

                            <li>
                              {
                                getDataFromValue(HOUSING_TYPE_OPTIONS, type)
                                  .label
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
                                <div className={styles['num']}>{bedroom}</div>
                                <div className={styles['ico']}>
                                  <img
                                    loading='lazy'
                                    src='/img/ico-bed.svg'
                                    width={29}
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
                                  src='/img/ico-bath.svg'
                                  width={21}
                                  alt=''
                                />
                              </div>
                            </li>
                            <li>
                              <div className={styles['num']}>{carpark}</div>
                              <div className={styles['ico']}>
                                <img
                                  loading='lazy'
                                  src='/img/ico-parking.svg'
                                  width={22}
                                  alt=''
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className={styles['meta-wrap']}>
                        <Link href={'/post/thanks'}>
                          <a
                            id='btnClickCreateListingSkipShare'
                            className={`btn ${styles['link-gray']}`}
                            onClick={() => {
                              triggerSkipShareGTAG()
                            }}
                          >
                            {t('btn_skip')}
                          </a>
                        </Link>

                        <a
                          onClick={() => {
                            handleShow()
                            triggerSubmitShareGTAG()
                          }}
                          id='btnClickCreateListingShare'
                          className={`btn btn-primary-filled ${styles['btn-share']}`}
                        >
                          {t('btn_share')}
                        </a>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          className='custModal shareModal'
                          // backdrop='static'
                        >
                          <Modal.Body
                            style={{
                              padding: '0 !important'
                            }}
                          >
                            <div
                              id='sharePopup'
                              className='white-popup'
                              style={{
                                margin: 0
                              }}
                            >
                              <button
                                type='button'
                                onClick={handleClose}
                                className='mfp-close'
                              >
                                ×
                              </button>
                              <div
                                className={`share-container text-center ${styles['main-wrapper']}`}
                              >
                                <div className='popup-header'>
                                  {t('btn_share')}
                                </div>
                                <div
                                  className={`${styles['pro-col']} ${styles['pro-grid']}`}
                                >
                                  <div className={styles['inner']}>
                                    <div
                                      className={`${styles['img']} ${styles['product-thumb']}`}
                                    >
                                      <img
                                        loading='lazy'
                                        src={images[0].url}
                                        alt='cover image'
                                      />
                                      <div className={styles['img-cap-right']}>
                                        <div className='no-deposit'>
                                          <img
                                            loading='lazy'
                                            src='/img/noDeposit.png'
                                            width={60}
                                            alt=''
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className={styles['des']}>
                                      <h2 className={styles['pro-title']}>
                                        <a>{name}</a>
                                      </h2>
                                      <div className={styles['price']}>
                                        RM {price}
                                      </div>
                                      <div className={styles['sub']}>
                                        <ul className={styles['features-sub']}>
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
                                              <div lassName={styles['ico']}>
                                                <img
                                                  loading='lazy'
                                                  src='/img/ico-bed.svg'
                                                  width={29}
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
                                            <div lassName={styles['ico']}>
                                              <img
                                                loading='lazy'
                                                src={'/img/ico-bath.svg'}
                                                width={21}
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
                                                src='/img/ico-parking.svg'
                                                width={22}
                                                alt=''
                                              />
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className={styles['btn-extra']}>
                                  <a
                                    id='btnFacebookShare'
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareableUrl}`}
                                    className={`btn btn-curv  ${styles['btn-facebook-filled']}`}
                                    target='_blank'
                                  >
                                    <Icon icon='facebookSq' size={'middle'} />
                                    &nbsp;
                                    {t('post:text_share_fb')}
                                  </a>
                                  <a
                                    onClick={copyToClipboard}
                                    className={`btn btn-curv btn-dark-gray-filled ${styles['btn-copyLink']}`}
                                  >
                                    <Icon icon='shareIcon' size={'middle'} />
                                    &nbsp; Copy Link
                                  </a>
                                  <input
                                    id='copyUrl'
                                    type='text'
                                    ref={textAreaRef}
                                    value={shareableUrl}
                                    className={`form-control ${styles['form-control']}`}
                                  />
                                </div>
                              </div>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </ValidationForm>
  )
}

const mapStateToProps = ({ post }) => {
  return {
    property: post.property
  }
}

export default connect(mapStateToProps, null)(withRouter(PostShare))
