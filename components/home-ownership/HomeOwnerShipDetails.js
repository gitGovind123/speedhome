import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'next/router'
import { Modal } from 'react-bootstrap'
import classNames from 'classnames'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import CloseIcon from '@material-ui/icons/Close'

import { getPropertyNameLink } from '../Common/Helper'
import Head from '../Common/Head'
import BreadCrumb from '../Common/BreadCrumbDyn'

import SharePopup from '../PropertyDetail/SharePopup'

import InfoRequestPopup from './InfoRequestPopup'
import SuccessMessagePopup from './SuccessMessagePopup'
import * as homeOwnershipActions from '../../actions/homeOwnership'

import HomeOwnershipInfo from './HomeOwnershipInfo'
import HomeOwnerShipDesc from './HomeOwnerShipDescription'
import HomeOwnerShipBottomBtn from './HomeOwnershipBottomBtn'

import styles from './HomeOwnerShipDetails.module.scss'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    paritialVisibilityGutter: 0
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30
  }
}

const CustomLeftArrow = props => {
  return (
    <button
      onClick={props.onClick}
      title='Previous (Left arrow key)'
      type='button'
      className='mfp-arrow mfp-arrow-left mfp-prevent-close previewArrow'
    />
  )
}

const CustomRightArrow = props => {
  return (
    <button
      onClick={props.onClick}
      title='Next (Right arrow key)'
      type='button'
      className='mfp-arrow mfp-arrow-right mfp-prevent-close previewArrow'
    />
  )
}

class HomeOwnerShipDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showImagesPopup: false,
      showSharePopup: false,
      showInfoPopup: false,
      successMessagePopup: false
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (
      state.homeOwnershipInfoRequestStatus !==
      props.homeOwnershipInfoRequestStatus
    ) {
      if (props.homeOwnershipInfoRequestStatus) {
        return {
          homeOwnershipInfoRequestStatus: props.homeOwnershipInfoRequestStatus
        }
      }
    }

    return null
  }

  componentDidUpdate (prevProps) {
    if (
      prevProps.homeOwnershipInfoRequestStatus !==
      this.props.homeOwnershipInfoRequestStatus
    ) {
      if (
        this.props.homeOwnershipInfoRequestStatus &&
        this.props.homeOwnershipInfoRequestStatus === 200
      ) {
        this.openPopup('successMessagePopup')
        this.closePopup('showInfoPopup')
      }
    }
  }

  openPopup = (popup, extraAttrs = {}) => {
    this.setState({ [popup]: true, ...extraAttrs })
  }

  closePopup = (popup, extraAttrs = {}) => {
    this.setState({ [popup]: false, ...extraAttrs })
  }

  togglePopup (index) {
    this.setState(
      {
        showImagesPopup: !this.state.showImagesPopup
      },
      () => {
        if (this.state.showImagesPopup && this.modalCarousel) {
          setTimeout(() => {
            this.modalCarousel.goToSlide(index + 2)
          }, 300)
        }
      }
    )
  }

  sendInfoRequest = request => {
    this.props.homeOwnershipActions.sendInfoRequest(request)
  }

  render () {
    const { homeOwnershipList, router, user } = this.props
    const {
      showImagesPopup,
      showSharePopup,
      showInfoPopup,
      successMessagePopup
    } = this.state

    let data =
      homeOwnershipList.find(
        item => getPropertyNameLink(item.name) === router.query.id
      ) || {}
    const images =
      data.galleryImages &&
      data.galleryImages.map((img, index) => (
        <img
          loading='lazy'
          key={index}
          className='avatarImg'
          src={img}
          alt=''
        />
      ))

    const CustomDot = ({
      index,
      onClick,
      active,
      carouselState: { currentSlide }
    }) => {
      return (
        <button
          onClick={e => {
            onClick()
            e.preventDefault()
          }}
          className={classNames('custom-dot', {
            'custom-dot--active': active
          })}
        >
          {React.Children.toArray(images)[index]}
        </button>
      )
    }

    return (
      <main className='main propertyDetailPage'>
        <Head title={data.name} />

        <main id='main' className='inner-pages'>
          <BreadCrumb />
        </main>

        <div className={styles['pro-detail-main']}>
          <div
            className={`${styles['pro-col']} ${styles['pro-detail-top']} container`}
          >
            <div className={styles['lightbox']}>
              <span className={styles['panaroma-close']}>
                <CloseIcon />
              </span>
              <div id='panorama'></div>
            </div>
            <div className='row'>
              <div className='col-md-12 '>
                {data.galleryImages && data.galleryImages.length > 0 ? (
                  <Carousel
                    ssr
                    partialVisbile
                    deviceType={'desktop'}
                    itemClass={styles['image-item']}
                    responsive={responsive}
                  >
                    {data.galleryImages &&
                      data.galleryImages.slice(0, 5).map(image => {
                        return (
                          <img
                            draggable={false}
                            style={{ width: '100%', height: '300px' }}
                            src={image}
                          />
                        )
                      })}
                  </Carousel>
                ) : (
                  <div className='item'>
                    <input type='hidden' id='coverPhotoIndex' value='0' />
                    <img
                      loading='lazy'
                      className={styles['slideImg']}
                      src={'/img/image-not-found.png'}
                    />
                  </div>
                )}
              </div>

              <HomeOwnershipInfo styles={styles} data={data} />
            </div>
          </div>

          <HomeOwnerShipDesc styles={styles} data={data} />
        </div>

        <HomeOwnerShipBottomBtn styles={styles} openPopup={this.openPopup} />

        <Modal
          show={showImagesPopup}
          className='propertyDetailPage popup'
          style={{ background: 'transparent' }}
        >
          <div className='text-center popup-title previewTitle'>
            {data.name}
          </div>
          <Modal.Body className='modalBody'>
            <a
              onClick={() => {
                this.openPopup('showSharePopup')
                this.closePopup('showImagesPopup')
              }}
              className='share-prop shareOption'
              title='Share'
            >
              <img loading='lazy' src={'/img/icons/share.svg'} width='16' />
            </a>
            <button
              onClick={() => {
                this.setState({ showImagesPopup: !showImagesPopup })
              }}
              title='Close (Esc)'
              type='button'
              className='mfp-close'
            >
              ×
            </button>
            <Carousel
              ref={el => (this.modalCarousel = el)}
              showDots
              autoPlay={false}
              responsive={responsive}
              draggable={false}
              swipeable={false}
              containerClass='carousel-preview'
              customDot={<CustomDot />}
              infinite={true}
              focusOnSelect={true}
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
              swipeable={true}
              slidesToSlide={1}
            >
              {data.galleryImages &&
                data.galleryImages.map((img, index) => (
                  <div key={index}>
                    <input type='hidden' id='coverPhotoIndex' value='0' />
                    <img
                      loading='lazy'
                      width='50'
                      className='mfp-img previewImg'
                      src={img}
                    />
                  </div>
                ))}
            </Carousel>
          </Modal.Body>
        </Modal>

        <SharePopup
          currentPath={(router && router.asPath) || ''}
          isOpen={showSharePopup}
          handleClose={() => this.closePopup('showSharePopup')}
        />

        <InfoRequestPopup
          isOpen={showInfoPopup}
          sendInfoRequest={this.sendInfoRequest}
          handleClose={() => this.closePopup('showInfoPopup')}
          type={data.type}
          propertyName={data.name ? data.name : null}
        />

        <SuccessMessagePopup
          isOpen={successMessagePopup}
          handleClose={() => this.closePopup('successMessagePopup')}
        />
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.language,
    homeOwnershipInfoRequestStatus:
      state.homeOwnership.homeOwnershipInfoRequestStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    homeOwnershipActions: bindActionCreators(homeOwnershipActions, dispatch)
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeOwnerShipDetails)
)
