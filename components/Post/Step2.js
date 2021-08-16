import React from 'react'
import Dropzone from 'react-dropzone'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'next/router'
import _ from 'lodash'

import MoreVert from '@material-ui/icons/MoreVert'
import Image from '@material-ui/icons/Image'
import Delete from '@material-ui/icons/Delete'
import RotateLeft from '@material-ui/icons/RotateLeft'
import RotateRight from '@material-ui/icons/RotateRight'
import UploadIcon from '@material-ui/icons/CloudUpload'
import ImageNext from 'next/image'

import { ValidationForm } from 'react-bootstrap4-form-validation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../actions/post'
import * as authActions from '../../actions/authActions'
import Resizer from 'react-image-file-resizer'
import { convertToBlob, getToken } from '../../globalutilities/helpers'

import { updateInstallSource } from '../../api/chatRequest'
// import LoginModal from '../Login/Login'

import SelectBox from '../Common/SelectBox'
import { IMAGE_LABEL } from './DB'
import Loader from '../Common/Loader'
import validator from 'validator'
import { setTime, userEventTracking } from '../../actions'
import {
  dengageConvertedDate,
  getRefQueryParams,
  triggerDengageEvents,
  triggerGTAG
} from '../../utils/utils'
import PostImageSizeErrorModal from './PostImageSizeErrorModal'
import Cookies from 'js-cookie'
import { AUTH_SERVER } from '../../env'

var deletedImage = []

class Step2 extends React.Component {
  constructor (props) {
    super(props)

    this.step2ref = {}

    this.state = {
      firstStep: this.props.firstStep,

      imageUrls: {
        imageUrl1: '',
        imageUrl2: '',
        imageUrl3: '',
        imageUrl4: '',
        imageUrl5: '',
        imageUrl6: '',
        imageUrl7: '',
        imageUrl8: '',
        imageUrl9: '',
        imageUrl10: '',
        imageUrl11: '',
        imageUrl12: ''
      },
      images: [],
      responseImages: null,
      captions: {
        imageUrl1: IMAGE_LABEL[0],
        imageUrl2: IMAGE_LABEL[0],
        imageUrl3: IMAGE_LABEL[0],
        imageUrl4: IMAGE_LABEL[0],
        imageUrl5: IMAGE_LABEL[0],
        imageUrl6: IMAGE_LABEL[0],
        imageUrl7: IMAGE_LABEL[0],
        imageUrl8: IMAGE_LABEL[0],
        imageUrl9: IMAGE_LABEL[0],
        imageUrl10: IMAGE_LABEL[0],
        imageUrl11: IMAGE_LABEL[0],
        imageUrl12: IMAGE_LABEL[0]
      },
      coverPhoto: '',
      rotatedImage: [],
      isRoatedIsCoverPhotoId: '',
      loading: false,
      openDropDownId: '',
      imageSizeError: false
    }
  }

  componentDidMount () {
    if (window) {
      window.scrollTo({
        top: 0
      })
    }
    if (this.props.propertyData) {
      const { images } = this.props.propertyData
      const { imageUrls, captions } = Object.assign({}, this.state)
      let coverPhotoKeyArray = []
      images.map((res, i) => {
        const imagesName = `imageUrl${i + 1}`
        imageUrls[imagesName] = res.url
        captions[imagesName] = res.label
          ? { value: res.label, label: res.label }
          : IMAGE_LABEL[0]
        coverPhotoKeyArray.push({
          cover: res.coverPhoto,
          key: imagesName
        })
      })
      let coverKeyName = ''
      if (coverPhotoKeyArray.filter(res => res.cover === true)[0]) {
        coverKeyName = coverPhotoKeyArray.filter(res => res.cover === true)[0]
          .key
      }
      this.setState({
        imageUrls,
        images: images,
        coverPhoto: coverKeyName
      })
    }
    if (this.props.isAfterLogin && getToken()) {
      const posData = localStorage.getItem('posData')
      if (posData) {
        const parsedData = JSON.parse(posData)
        this.setState(parsedData, () => {
          localStorage.removeItem('posData')
          this.createListing()
        })
      }
    }
  }
  addImageToState (filesArray, stateParam) {
    if (filesArray && filesArray.length === 0) {
      alert('Please select a valid image')
    }
    const { images, imageUrls } = this.state

    filesArray.forEach((file, index) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const allImageKeys = Object.keys(imageUrls)

        allImageKeys.forEach(imageKey => {
          let allImageValues = Object.values(imageUrls)
          let findExistingImage = allImageValues.find(imageData => {
            return imageData === reader.result
          })

          if (imageUrls[imageKey] == '' && !findExistingImage) {
            imageUrls[imageKey] = reader.result
            images.push(file)
            this.setState({ imageUrls: imageUrls, images })
          }
        })
      }
      reader.readAsDataURL(file)
    })
    this.setState({
      coverPhoto: this.state.coverPhoto ? this.state.coverPhoto : 'imageUrl1'
    })
  }

  changeImageLabel (caption, option) {
    const captions = this.state.captions
    if (caption === 'caption1') {
      captions.imageUrl1 = option
      this.setState({
        captions
      })
    } else if (caption === 'caption2') {
      captions.imageUrl2 = option
      this.setState({
        captions
      })
    } else if (caption === 'caption3') {
      captions.imageUrl3 = option
      this.setState({
        captions
      })
    } else if (caption === 'caption4') {
      captions.imageUrl4 = option
      this.setState({
        captions
      })
    } else if (caption === 'caption5') {
      captions.imageUrl5 = option
      this.setState({
        captions
      })
    } else if (caption === 'caption6') {
      captions.imageUrl6 = option
      this.setState({
        captions
      })
    } else if (caption === 'caption7') {
      captions.imageUrl7 = option
      this.setState({
        captions
      })
    } else if (caption === 'caption8') {
      captions.imageUrl8 = option
      this.setState({
        captions
      })
    } else if (caption === 'caption9') {
      captions.imageUrl9 = option
      this.setState({
        captions
      })
    } else if (caption === 'caption10') {
      captions.imageUrl10 = option
      this.setState({
        captions
      })
    } else if (caption === 'caption11') {
      captions.imageUrl11 = option
      this.setState({
        captions
      })
    } else if (caption === 'caption12') {
      captions.imageUrl12 = option
      this.setState({
        captions
      })
    }
  }
  rotateImgdeleteImgApi = () => {
    return new Promise((resolve, reject) => {
      let isFinishedRotateDeleteLength = 0

      this.state.rotatedImage.map(rImg => {
        if (rImg.imageItem.hasOwnProperty('id')) {
          const imageId = rImg.imageItem.id
          if (this.props.propertyData) {
            this.props.postActions.deletePostImage(imageId).then(res => {
              isFinishedRotateDeleteLength = isFinishedRotateDeleteLength + 1
              if (
                isFinishedRotateDeleteLength === this.state.rotatedImage.length
              ) {
                resolve(true)
              }
            })
          }
        } else {
          isFinishedRotateDeleteLength = isFinishedRotateDeleteLength + 1
          resolve(true)
        }
      })
    })
  }
  createListing = () => {
    const token = getToken() || ''
    if (this.state.images.length > 3) {
      if (deletedImage.length > 0) {
        this.finalDelete()
      }

      if (!token) {
        //first need to save process all the data and save in cookies..
        // revert to authServer with some params.. when brought back to this page i will go straigt to 3rd steps

        const stringyfyStates = JSON.stringify(this.state)

        localStorage.setItem('posData', stringyfyStates)
        this.setState({
          loading: true
        })
        setTimeout(() => {
          const currentPath = window.location.href
          const refParams = getRefQueryParams()

          const constructUrl = `${AUTH_SERVER}?originType=SH&origin=${currentPath}&clPost=2${refParams}`
          window.location.href = constructUrl
        }, 50)
      } else {
        if (this.state.coverPhoto) {
          let isUserLocked = false
          if (this.props.user && this.props.user.locked) {
            isUserLocked = true
          }

          if (isUserLocked) {
            this.props.authActions.showWarningModal(true)
          } else {
            this.setState({
              loading: true
            })
            const captions = this.state.captions
            const images = this.state.imageUrls
            if (this.state.rotatedImage.length > 0) {
              this.rotateImgdeleteImgApi().then(res => {
                this.setState(
                  {
                    rotatedImage: []
                  },
                  () => this.listinCreationOrUpdate(images, captions)
                )
              })
            } else {
              this.listinCreationOrUpdate(images, captions)
            }
          }
        } else {
          alert('select cover')
        }
      }
    } else {
      this.setState({
        imageSizeError: true
      })
    }
  }
  listinCreationOrUpdate = (images, captions) => {
    let data = []
    Object.keys(images).forEach((key, index) => {
      let caption = ''
      if (captions[key].value !== IMAGE_LABEL[0].value) {
        caption = captions[key].value
      }
      if (images[key]) {
        data.push({
          coverPhoto: key === this.state.coverPhoto,
          image: images[key].includes('https://')
            ? images[key].split(',')[0]
            : images[key].split(',')[1],
          label: caption
        })
      }
    })
    if (this.props.propertyData) {
      this.updatePost(data)
    } else {
      this.createPost(data)
    }
  }
  handleCloseAlertModal = () => {
    this.setState({
      imageSizeError: false
    })
  }
  updateInstallSourceMethod = () => {
    const param = localStorage.getItem('utmParam')
    if (param) {
      const data = {
        source: param
      }
      updateInstallSource(data).then(res => {})
    }
  }
  createPost = imgData => {
    const data = this.state.firstStep

    if (data) {
      this.props.postActions.createPost(data).then((res, error) => {
        if (res.payload && res.payload.id) {
          const postData = res.payload
          const propertyId = postData.id
          let imgUploadStatus = []
          imgData.map(data => {
            this.props.postActions
              .uploadPostImage(propertyId, data)
              .then((res, error) => {
                if (res.payload) {
                  imgUploadStatus.push(1)
                  if (imgUploadStatus.length === imgData.length) {
                    this.setState(
                      {
                        loading: false
                      },
                      () => {
                        if (
                          (this.state.firstStep.type === 'HIGHRISE' ||
                            this.state.firstStep.type === 'LANDED') &&
                          parseInt(this.state.firstStep.price) >= 800 &&
                          parseInt(this.state.firstStep.price) < 5001
                        ) {
                          triggerGTAG({
                            event: 'PostListing_ALL'
                          })
                          triggerGTAG({
                            event: 'createListing'
                          })
                        }

                        triggerDengageEvents('speed_rent_post_property', {
                          event_name: 'complete_pp_2',
                          name: this.props.user ? this.props.user.name : '',
                          phone_number:
                            this.props.user && this.props.user.phoneNumber
                              ? this.props.user.phoneNumber
                              : '',
                          email_address:
                            this.props.user && this.props.user.email
                              ? this.props.user.email
                              : '',
                          property_value: parseInt(this.state.firstStep.price),

                          area_of_property: this.state.firstStep.address,
                          date: dengageConvertedDate()
                        })

                        userEventTracking('CreateListing', propertyId)
                        this.updateInstallSourceMethod()
                        this.props.updateSecondStepData(postData)
                        this.props.onPhotoUploadSuccess(true)
                      }
                    )
                  }
                } else {
                  if (res.response && res.response.status) {
                    if (window) {
                      window.scrollTo({
                        top: 0
                      })
                    }
                    alert('something went wrong while uplaoding the pictures')
                    this.setState({
                      loading: false
                    })
                  }
                }
              })
          })
        } else {
          window.scrollTo({
            top: 0
          })
          this.setState({
            loading: false
          })
          if (res.response) {
            if (res.response.status === 403) {
              this.props.showAlertMessage({ agent: true })
            } else {
              this.props.showAlertMessage({ agent: false })
            }
          }
        }
      })
    }
  }
  retnum (str) {
    var num = str.replace(/[^0-9]/g, '')
    return parseInt(num, 10)
  }
  updatePost = imgData => {
    const propertyId = this.props.propertyData.id
    const { images, coverPhoto, firstStep, captions } = this.state
    const dataFirstStep = firstStep
    const coverPhotoNumber = this.retnum(coverPhoto)

    images.map((img, i) => {
      if (i === coverPhotoNumber - 1) {
        const imgId = img.id
        const propertyId = img.propertyId
        const coverData = {
          coverPhoto: true,
          label: captions[coverPhoto].value
            ? captions[coverPhoto].value
            : IMAGE_LABEL[0]
        }
        this.props.postActions
          .updateCoverPhoto(imgId, propertyId, coverData)
          .then(res => {})
      }
    })
    // updating label
    if (images.length === imgData.length) {
      for (let item1 of images) {
        for (let item2 of imgData) {
          if (item1.url === item2.image && !item1.coverPhoto) {
            if (item2.label && item2.label.length > 0) {
              if (item1.label !== item2.label) {
                const captionData = {
                  coverPhoto: false,
                  label: item2.label
                }
                this.props.postActions
                  .updateCoverPhoto(item1.id, item1.propertyId, captionData)
                  .then(res => {})
              }
            }
          }
        }
      }
    }
    if (dataFirstStep) {
      this.props.postActions.updatePost(propertyId, dataFirstStep).then(res => {
        if (res.payload) {
          const postData = res.payload
          let imgUploadStatus = []
          let hasBase64 = false
          imgData.map(data => {
            if (data.image) {
              hasBase64 = validator.isBase64(data.image)
            }
          })
          if (hasBase64) {
            imgData.map(data => {
              let base64Number = 0
              if (data.image && validator.isBase64(data.image)) {
                base64Number++
                this.props.postActions
                  .uploadPostImage(propertyId, data)
                  .then(res => {
                    if (res.payload) {
                      imgUploadStatus.push(1)
                      if (imgUploadStatus.length === base64Number) {
                        this.setState(
                          {
                            loading: false
                          },
                          () => {
                            this.props.updateSecondStepData(postData)
                            this.props.onPhotoUploadSuccess(true)
                          }
                        )
                      }
                    }
                  })
              }
            })
          } else {
            this.setState(
              {
                loading: false
              },
              () => {
                this.props.updateSecondStepData(postData)
              }
            )
          }
        }
      })
    }
  }
  getCaption (index) {
    if (index + 1 == 1) {
      return this.state.captions.imageUrl1
    } else if (index + 1 == 2) {
      return this.state.captions.imageUrl2
    } else if (index + 1 == 3) {
      return this.state.captions.imageUrl3
    } else if (index + 1 == 4) {
      return this.state.captions.imageUrl4
    } else if (index + 1 == 5) {
      return this.state.captions.imageUrl5
    } else if (index + 1 == 6) {
      return this.state.captions.imageUrl6
    } else if (index + 1 == 7) {
      return this.state.captions.imageUrl7
    } else if (index + 1 == 8) {
      return this.state.captions.imageUrl8
    } else if (index + 1 == 9) {
      return this.state.captions.imageUrl9
    } else if (index + 1 == 10) {
      return this.state.captions.imageUrl10
    } else if (index + 1 == 11) {
      return this.state.captions.imageUrl11
    } else if (index + 1 == 12) {
      return this.state.captions.imageUrl12
    }
  }
  finalDelete () {
    deletedImage.map((item, index) => {
      this.props.postActions.deletePostImage(item.imageId).then(res => {})
    })
  }
  getImageCaptionByIndex = index => {
    let caption = this.getCaption(index)
    if (caption && caption.label === 'disabled') {
      caption.label = 'Select image label'
      return caption
    } else {
      return caption
    }
  }
  deleteImg = (index, item, key) => {
    const { images, imageUrls, captions } = _.cloneDeep(this.state)
    const imageId = (item && item.id) || ''
    if (this.props.propertyData && imageId) {
      deletedImage.push({
        imageId: imageId
      })
      //alert(deletedImage)
      //this.props.postActions.deletePostImage(imageId).then(res => {})
    }

    images.splice(index - 1, 1)
    const newImages = images
    const existingImages = []
    const keysArray = Object.keys(imageUrls)
    keysArray.filter(urlKey => {
      if (imageUrls[urlKey]) {
        existingImages.push({
          key: urlKey,
          url: imageUrls[urlKey]
        })
      }
    })
    const dltImageIndex = existingImages.findIndex(img => img.key === key)
    imageUrls[key] = ''
    captions[key] = IMAGE_LABEL[0]
    let coverPhoto = this.state.coverPhoto
    if (coverPhoto === key) {
      coverPhoto = ''
      const newCoverImgIndex =
        existingImages.length - 1 > dltImageIndex
          ? existingImages[dltImageIndex + 1] &&
            existingImages[dltImageIndex + 1].key
          : existingImages[dltImageIndex - 1] &&
            existingImages[dltImageIndex - 1].key

      const newImgArr = newImages.filter(res => res.coverPhoto !== true)
      if (existingImages.length) {
        if (
          newImgArr &&
          newImgArr[newCoverImgIndex] &&
          newImgArr[newCoverImgIndex].coverPhoto
        ) {
          newImgArr[newCoverImgIndex].coverPhoto = true
        } else {
          newImgArr[newCoverImgIndex] = {
            ...newImgArr[newCoverImgIndex],
            coverPhoto: true
          }
        }
        coverPhoto = newCoverImgIndex
      }
    }
    this.setState({
      images: newImages,
      imageUrls,
      captions
    })
  }
  makeCover = item => {
    if (item === this.state.coverPhoto) {
      this.setState({
        coverPhoto: ''
      })
    } else {
      this.setState({
        coverPhoto: item
      })
    }
  }
  submitListingCreationSubmitAfterLogin = () => {
    const token = getToken() || ''
    if (!token) {
      // this.handleRequestError();
      alert('something went wrong')
    }
    // this.sendSecondStepData();
  }

  rotateBase64Image = (item, index, side) => {
    let imageUrls = this.state.imageUrls
    let imageToRotate = this.state.imageUrls[item]

    const url =
      imageToRotate.indexOf('data:image') === 0
        ? imageToRotate
        : imageToRotate + '?' + new Date().getTime()
    convertToBlob(url).then(blob => {
      Resizer.imageFileResizer(
        blob,
        1200,
        630,
        'JPEG',
        100,
        side === 'right' ? 90 : 270,
        uri => {
          imageUrls[item] = uri
          const concateRotateArrat = this.state.rotatedImage.concat({
            index: index + 1,
            imageItem: this.state.images[index],
            imageIndex: item
          })
          return this.setState({
            imageUrls,
            rotatedImage: concateRotateArrat
          })
        },
        'base64'
      )
    })
  }

  render () {
    const photosArray = Object.keys(this.state.imageUrls)
    const { images } = this.state
    const existingImages = photosArray.filter(
      item => this.state.imageUrls[item] !== ''
    )
    const upItem = photosArray.find(item => this.state.imageUrls[item] === '')
    const upIdx = photosArray.findIndex(
      item => this.state.imageUrls[item] === ''
    )
    const hasToken = getToken() || ''
    const currentLang = this.props.router.locale
    const { styles } = this.props
    return (
      <ValidationForm
        onSubmit={e => {
          e.preventDefault()
          this.createListing()
        }}
        ref={ref => (this.step2ref = ref)}
      >
        {/* {hasToken ? null : (
          <LoginModal
            router={this.props.router}
            handleLoginComplete={this.submitListingCreationSubmitAfterLogin}
            onRef={ref => (this.login = ref)}
          />
        )} */}

        <div>
          <h2 className={`${styles['step-sub-title']}  text-center`}>
            {currentLang === 'en'
              ? 'Photo Guidelines'
              : currentLang === 'my'
              ? 'Garis Panduan Foto'
              : '照片指南'}
          </h2>

          <Row>
            <Col className={styles['photo-guideline']}>
              <div className={styles['photo-guideline-ico']}>
                <ImageNext
                  loading='lazy'
                  src='/img/photo-guidelines.svg'
                  alt=''
                  width={80}
                  height={50}
                />
                <div className={styles['caption']}>
                  {currentLang === 'en'
                    ? 'At least 4'
                    : currentLang === 'my'
                    ? 'Sekurang-kurangnya 4 foto tanpa tera air'
                    : '最少4张没有水印的照片'}
                  <br />
                  {currentLang === 'en'
                    ? 'non-watermarked'
                    : currentLang === 'my'
                    ? 'non-watermarked'
                    : ' '}
                </div>
              </div>
            </Col>
            <Col className={styles['photo-guideline']}>
              <div className={styles['photo-guideline-ico']}>
                <ImageNext
                  loading='lazy'
                  src='/img/photo-guidelines-hd.svg'
                  alt=''
                  width={80}
                  height={50}
                />
                <div className={styles['caption']}>
                  {currentLang === 'en'
                    ? 'High'
                    : currentLang === 'my'
                    ? 'Foto berkualiti tinggi'
                    : '高清图片'}
                  <br />
                  {currentLang === 'en'
                    ? 'Quality Photos'
                    : currentLang === 'my'
                    ? 'Quality Photos'
                    : ' '}
                </div>
              </div>
            </Col>
            <Col className={styles['photo-guideline']}>
              <div className={styles['photo-guideline-ico']}>
                <ImageNext
                  loading='lazy'
                  src='/img/photo-guidelines-sun.svg'
                  alt=''
                  width={80}
                  height={50}
                />
                <div className={styles['caption']}>
                  {currentLang === 'en'
                    ? 'Bright and'
                    : currentLang === 'my'
                    ? 'Pencahayaan natural dan terang'
                    : '自然灯光'}
                  <br />
                  {currentLang === 'en'
                    ? 'Natural Lighting'
                    : currentLang === 'my'
                    ? 'Natural Lighting'
                    : ' '}
                </div>
              </div>
            </Col>
          </Row>

          <Row className={styles['photoThumbs']}>
            {existingImages.map((item, index) => {
              return (
                <Col xs={6} md={4} key={item}>
                  <div
                    className={styles['photoBoxWithImg']}
                    style={{
                      background: `url(${this.state.imageUrls[item]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {' '}
                    {this.state.coverPhoto === item ? (
                      <span className={styles['photoBoxWithImg_makeCover']}>
                        {this.state.coverPhoto === item ? 'Cover Photo' : ''}
                      </span>
                    ) : null}
                    <div
                      className={`${styles['photoBoxWithImg_delete']} ${styles['photoBoxWithImg_morevert']}`}
                      onClick={() => {
                        this.setState({
                          openDropDownId: item
                        })
                      }}
                    >
                      <MoreVert className='icon' />
                      {/* {this.state.openDropDownId === item ? ( */}
                      <div className={styles['photoBoxWithImg_moreWrapper']}>
                        <ul className={styles['photoBoxWithImg_moremenu']}>
                          {this.state.coverPhoto === item ? null : (
                            <li onClick={this.makeCover.bind(this, item)}>
                              <Image className={styles['more_icon']} />
                              Make cover
                            </li>
                          )}
                          <li
                            onClick={() => {
                              this.rotateBase64Image(item, index, 'right')
                            }}
                          >
                            <RotateRight className={styles['more_icon']} />
                            Rotate right
                          </li>
                          <li
                            onClick={() => {
                              this.rotateBase64Image(item, index, 'left')
                            }}
                          >
                            <RotateLeft className={styles['more_icon']} />
                            Rotate left
                          </li>
                          <li
                            className={styles['delete_item']}
                            onClick={() =>
                              this.deleteImg(index + 1, images[index], item)
                            }
                          >
                            <Delete className={styles['more_icon']} /> Delete
                          </li>
                        </ul>
                      </div>
                      {/* ) : null} */}
                    </div>
                  </div>
                  <div className={styles['custom-option-wrapper']}>
                    {this.state.imageUrls[item] ? (
                      <>
                        <SelectBox
                          data={IMAGE_LABEL}
                          placeholderText='Select image label'
                          stateVal={this.getImageCaptionByIndex(index)}
                          changeVal={this.changeImageLabel.bind(
                            this,
                            `caption${index + 1}`
                          )}
                        />
                      </>
                    ) : null}
                  </div>
                </Col>
              )
            })}

            {existingImages.length < 12 && (
              <Col xs={6} md={4} key={upItem}>
                <Dropzone
                  accept='image/jpeg, image/png, image/jpg'
                  onDrop={acceptedFiles => {
                    this.addImageToState(acceptedFiles, upItem)
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input
                          {...getInputProps()}
                          accept='image/x-png,image/jpeg'
                        />
                        <div className={styles['photoBox']}>
                          <div className={styles['icon__container']}>
                            <UploadIcon className='icon' />
                            <p>Drag and Drop here</p>
                            <span>or</span>
                          </div>
                          <div className={styles['box__desc']}>
                            <button type='button'>Browse</button>
                            <span>
                              Photos must be less than <b>5 MB</b>
                            </span>
                            <span>
                              Allowed file types: <b>.jpg .png</b>
                            </span>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
                <div className={styles['custom-option-wrapper']}>
                  {this.state.imageUrls[upItem] ? (
                    <SelectBox
                      data={IMAGE_LABEL}
                      placeholderText='Select image label'
                      stateVal={this.getCaption(upIdx)}
                      changeVal={this.changeImageLabel.bind(
                        this,
                        `caption${upIdx + 1}`
                      )}
                    />
                  ) : null}
                </div>
              </Col>
            )}
          </Row>

          <div className={styles['nextButton-step2']}>
            <Button
              id='btnClickCreateListingStep2'
              type='submit'
              className='primary'
              style={{ fontWeight: '500' }}
            >
              Continue
            </Button>
          </div>
        </div>
        {this.state.loading ? (
          <div className='loading-overlay--post'>
            <Loader />
          </div>
        ) : null}
        <PostImageSizeErrorModal
          styles={styles}
          imageSizeError={this.state.imageSizeError}
          handleCloseAlertModal={this.handleCloseAlertModal}
        />
      </ValidationForm>
    )
  }
}

function mapStateToProps ({ auth }) {
  return {
    user: auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postActions: bindActionCreators(postActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Step2))
