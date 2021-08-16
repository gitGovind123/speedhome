import React, { useRef, useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import Link from 'next/link'
import { withRouter } from 'next/router'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import Head from '../Common/Head'
import BreadCrumb from '../Common/BreadCrumb'
import CONST from '../../globalutilities/consts'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../actions/post'

import { getDataFromValue, getBase64FromImageUrl } from '../Common/Helper'
import {
  HOUSING_TYPE_OPTIONS,
  ROOM_TYPE_OPTIONS,
  FURNISHING_OPTIONS
} from './DB'

import styles from './PagesForRent.module.scss'

const PostPagesForRent = props => {
  const {
    name,
    type,
    sqft,
    carpark,
    bedroom,
    bathroom,
    furnishType,
    roomType,
    bathroomType,
    images,
    ref
  } = props.propertyDetail

  const [uploadableRentImge, setUploadableRentImge] = useState([])
  const [getRent, setGetRent] = useState()
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false)

  useEffect(() => {
    // on load
    // landmarkLabelVerified
    if (props.propertyDetail) {
      if (props.propertyDetail.type === 'HIGHRISE_SALE') {
      } else if (props.propertyDetail.type === 'LANDED_SALE') {
        props.propertyDetail.images.map(image => {
          getBase64FromImageUrl(image.url).then(base64 => {
            if (base64 && base64.errStatus && base64.errStatus === 'imgError') {
              const makeDouble = [`${image.url}1`, image.url]
              makeDouble.map(url => {
                getBase64FromImageUrl(url).then(base64 => {
                  if (base64 && !base64.errStatus) {
                    setUploadableRentImge(arr => [
                      ...arr,
                      {
                        coverPhoto: image.coverPhoto,
                        image: base64.split(',')[1],
                        label: `${Math.random()
                          .toString(36)
                          .substring(7)}.jpg`
                      }
                    ])
                  }
                })
              })
            } else {
              setUploadableRentImge(arr => [
                ...arr,
                {
                  coverPhoto: image.coverPhoto,
                  image: base64.split(',')[1],
                  label: `${Math.random()
                    .toString(36)
                    .substring(7)}.jpg`
                }
              ])
            }
          })
        })

        return
      } else {
        props.router.push(`/`)
      }
    }
  }, [props.propertyDetail])

  const submitForCreatingRent = () => {
    setDisableSubmitBtn(true)
    const sellRef = ref
    if (props.propertyDetail) {
      const sellPropertyData = props.propertyDetail
      sellPropertyData.price = getRent
      sellPropertyData.saleType = null

      if (sellPropertyData.type === 'HIGHRISE_SALE') {
        sellPropertyData.type = 'HIGHRISE'
      } else if (sellPropertyData.type === 'LANDED_SALE') {
        sellPropertyData.type = 'LANDED'
      }

      props.postActions.createPost(sellPropertyData).then(res => {
        if (res.payload) {
          const propertyId = res.payload.id
          if (sellPropertyData.images && sellPropertyData.images.length > 0) {
            let imageUploadStatus = false
            let imgUploadStatus = []

            uploadableRentImge.map(imageData => {
              props.postActions
                .uploadPostImage(propertyId, imageData)
                .then((res, error) => {
                  if (res.payload) {
                    imgUploadStatus.push(1)

                    if (
                      imgUploadStatus.length === sellPropertyData.images.length
                    ) {
                      imageUploadStatus = true
                      if (imageUploadStatus) {
                        const updateDataForNewRent = {
                          furnishes: sellPropertyData.furnishes
                            ? sellPropertyData.furnishes
                            : null,
                          facilities: sellPropertyData.facilities
                            ? sellPropertyData.facilities
                            : null,
                          availability: sellPropertyData.availability
                            ? sellPropertyData.availability
                            : '',
                          allRaces: sellPropertyData.allRaces
                            ? sellPropertyData.allRaces
                            : true,
                          petFriendly: sellPropertyData.petFriendly
                            ? sellPropertyData.petFriendly
                            : false,
                          bumiLot: sellPropertyData.bumiLot
                            ? sellPropertyData.bumiLot
                            : false,
                          description: sellPropertyData.description
                            ? sellPropertyData.description
                            : '',
                          allowWhatsappAutomation: sellPropertyData.allowWhatsappAutomation
                            ? sellPropertyData.allowWhatsappAutomation
                            : true
                        }
                        props.postActions
                          .updatePostForRent(propertyId, updateDataForNewRent)
                          .then(res => {
                            if (res.payload) {
                              props.router.push(`/post/share/${sellRef}`)
                            }
                          })
                      }
                    }
                  } else {
                    setDisableSubmitBtn(false)
                  }
                })
            })
          }
        } else {
          setDisableSubmitBtn(false)
        }
      })
    }
  }

  return (
    <ValidationForm
      onSubmit={e => {
        e.preventDefault()
        submitForCreatingRent()
      }}
    >
      <section className={styles['post_pages_for_rent']}>
        <Head
          title={'Post a Property to Find Tenants | SPEEDHOME'}
          description={
            'Are you looking for a tenant for your property? Let SPEEDHOME speed up the process of finding the best tenant and make you a landlord. Fill out out the form, takes up only minutes.'
          }
        />
        <BreadCrumb breadCrumb={CONST.postPageForRent} />
        <Container>
          <div className={`${styles['create-listing']}`}>
            <div className={styles['headline']}>
              <strong>
                Thinking about renting out your property as well? Easily create
                a rental listing
              </strong>
            </div>
          </div>

          <Row>
            <Col md={12}>
              <div className={styles['pro-col']}>
                <div className={styles['inner']}>
                  <div className={styles['product-thumb']}>
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
                          {getDataFromValue(HOUSING_TYPE_OPTIONS, type).label}
                        </li>
                        <li>
                          {
                            getDataFromValue(FURNISHING_OPTIONS, furnishType)
                              .label
                          }
                        </li>
                      </ul>
                      <ul className={`${styles['facilities']} postrent`}>
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
                    <div className='col-xs-12 col-md-12 getrent' id='monthly'>
                      <div
                        className='input-box floating-placeholder no-icon'
                        style={{
                          float: 'left',
                          width: '180px',
                          margin: '.5rem auto 10px'
                        }}
                      >
                        <TextInput
                          type='text'
                          name='price'
                          id='price'
                          className='form-control'
                          placeholder={500}
                          value={getRent}
                          onChange={e => setGetRent(e.target.value)}
                          required
                          pattern='^([1-9][0-9]*)$'
                          errorMessage={{
                            required: 'Price is required',
                            pattern:
                              'Price must be greater than RM 1 and can not be decimals.'
                          }}
                        />
                      </div>
                      <strong
                        style={{ lineHeight: '3.5rem', paddingLeft: '1rem' }}
                      >
                        /month
                      </strong>
                    </div>
                  </div>
                </div>
                <br />
                <div className='btn-holder text-right'>
                  <button
                    type='submit'
                    id='postSellNow'
                    disabled={disableSubmitBtn}
                    className={`btn btn-curv btn-default  ${styles['feedback-btn-submit']}`}
                  >
                    Post now!
                    {disableSubmitBtn ? (
                      <i
                        className='fa fa-spinner fa-spin'
                        style={{ marginLeft: '.5rem' }}
                      />
                    ) : (
                      ''
                    )}
                  </button>
                  <a
                    href={`/post/share/${ref}`}
                    id='skip'
                    className={`btn ${styles['link-gray']} ${styles['btn-skip-link']}`}
                  >
                    Skip
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </ValidationForm>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    postActions: bindActionCreators(postActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(withRouter(PostPagesForRent))
