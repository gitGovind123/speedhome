import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import BreadCrumbDyn from '../Common/BreadCrumbDyn'

import SchoolIcon from '@material-ui/icons/School'
import WorkIcon from '@material-ui/icons/Work'
import DeleteIcon from '@material-ui/icons/Delete'
import BusinessCenter from '@material-ui/icons/BusinessCenter'
import { ClipLoader } from 'react-spinners'
import swal from 'sweetalert2'
import useTranslation from 'next-translate/useTranslation'

import { Container, Row, Col } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import Head from '../Common/Head'
import { connect } from 'react-redux'
import { addDocumentApiCall, verifyDocumentApiCall } from '../../api/deal'
// import { updateDealApiCall } from '../../api/deal'
import { getToken, getUserId, getBase64 } from '../../globalutilities/helpers'
import Cookies from 'js-cookie'
import * as dealAction from '../../actions/deal'
import * as authActions from '../../actions/authActions'

import { bindActionCreators } from 'redux'
import styles from '../../components/deals/deals.module.scss'

const FILE_TYPE = [
  '.jpeg',
  '.jpg',
  '.png',
  '.pdf',
  '.xls',
  '.xlsx',
  '.doc',
  '.docx',
  '.csv'
]

const UploadDocsComponent = props => {
  const [dealData, setDealData] = useState(null)
  const [documentsList, setDocumentList] = useState([])
  const [selectedProfession, setSelectedProfession] = useState('working')
  const [disableSubmit, setDisableSubmit] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(false)
  const [isPreDoc, setIsPreDoc] = useState(false)
  const [user, setUser] = useState(null)
  const [documentInfo, setDocumentInfo] = useState(null)
  const [isLocal, setIsLocal] = useState(false)

  const { t } = useTranslation('common')
  useEffect(() => {
    handleShowLoginModal()
  }, [])

  useEffect(() => {
    // initialValidate(props.dealData)
    if (props.dealData) {
      setDealData(props.dealData)
      setIsLocal(props.dealData.local)
    }
  }, [props.dealData])
  useEffect(() => {
    if (props.isLocal) {
      setIsLocal(true)
    }
  }, [props.isLocal])
  useEffect(() => {
    if (props.user !== user) {
      setUser(props.user)
      initialValidate()
    }
  }, [props.user])

  const handleShowLoginModal = () => {
    const token = getToken()
    if (!token) {
      props.authActions.openLoginModal({
        countryData: {},
        phoneNumber: '',
        request: false,
        disableClose: true
      })
    }
  }

  const initialValidate = () => {
    if (props.router.asPath.includes('/dashboard/profile')) {
      setIsPreDoc(true)
      props.dealAction.getDealIdByUserId().then(document => {
        setDocumentInfo(document)
      })
    } else {
      setIsPreDoc(false)
      const hash = Cookies.get('dealHashKey')
      props.dealAction.fetchDealData(
        {
          id: getUserId(),
          authToken: getToken()
        },
        hash
      )
    }
  }
  const getFileUrl = file => {
    if (file.name.toLowerCase().includes('.jpg')) {
      return URL.createObjectURL(file)
    } else if (file.name.toLowerCase().includes('.png')) {
      return URL.createObjectURL(file)
    } else if (file.name.toLowerCase().includes('.jpeg')) {
      return URL.createObjectURL(file)
    } else if (file.name.toLowerCase().includes('.pdf')) {
      return 'pdf'
    } else if (file.name.toLowerCase().includes('.xls')) {
      return 'xls'
    } else if (file.name.toLowerCase().includes('.xlsx')) {
      return 'xlsx'
    } else if (file.name.toLowerCase().includes('.doc')) {
      return 'doc'
    } else if (file.name.toLowerCase().includes('.docx')) {
      return 'doc'
    } else if (file.name.toLowerCase().includes('.csv')) {
      return 'csv'
    }
  }
  const addImageToState = filesArray => {
    setUploadStatus(true)

    let tempDocumentArray = []

    if (filesArray && filesArray.length > 0) {
      filesArray.map((file, index) => {
        const arrayContainsFileType = FILE_TYPE.some(substring =>
          file.name.toLowerCase().includes(substring)
        )
        if (file.size > 10485760) {
          showFileUploadError()
        } else {
          if (arrayContainsFileType) {
            const filePrevUrl = getFileUrl(file) || ''
            getBase64(file, result => {
              // let res = 0
              const fileName = file.name
                ? file.name.toLowerCase()
                : Math.random()
                    .toString(36)
                    .substring(7)
              let obj = {
                base64: result.split(',')[1],
                url: filePrevUrl,
                name: fileName
              }
              if (filesArray.length === index + 1) {
                setUploadStatus(false)
              }
              tempDocumentArray.push(obj)
              const another = [...documentsList, ...tempDocumentArray]
              setDocumentList(another)
            })
          } else {
            showFileUploadError()
          }
        }
      })
    }
  }
  const showFileUploadError = () => {
    swal.fire({
      title: 'Invalid File',
      html:
        '<p>' +
        'This file is not supported.<br /> Please upload a valid file! <br/>' +
        'File should be maximum 10MB in size and one of the following formats: <br />' +
        'jpeg, jpg, png, pdf, Microsoft Word (doc, docx), spreadsheet files' +
        '</p>',
      icon: 'error'
    })
    setUploadStatus(false)
  }
  const getPreviewImg = imageType => {
    switch (imageType) {
      case 'pdf':
        return <img src={'/img/pdfIcon.png'} />
      case 'xls':
        return <img src={'/img/xlsIcon.png'} />
      case 'xlsx':
        return <img src={'/img/xlsIcon.png'} />
      case 'doc':
        return <img src={'/img/docIcon.png'} />
      case 'docx':
        return <img src={'/img/docIcon.png'} />
      case 'csv':
        return <img src={'/img/csvIcon.png'} />
      default:
        return <img src={imageType} />
    }
  }

  const deleteImg = docIndex => {
    const newDoclist = documentsList.filter((res, i) => i !== docIndex)
    setDocumentList(newDoclist)
  }
  const showPreDocSuccess = () => {
    swal
      .fire({
        position: 'center',
        icon: 'success',
        title:
          'Thank you for completing checking! Alicia will reach out to you with your results',
        showConfirmButton: true,
        // timer: 2000,
        allowOutsideClick: false
      })
      .then(() => {
        props.finishPreDocStatus()
      })
  }

  const uploadDocuments = () => {
    setDisableSubmit(true)
    setUploadStatus(true)
    let resLength = 0

    if (documentsList && documentsList.length > 0) {
      const hash = Cookies.get('dealHashKey')
      documentsList.map(document => {
        let data = {}
        if (isPreDoc) {
          data = {
            doc: document.base64,
            filename: document.name,
            type: 'ENTRY'
          }
          if (documentInfo) {
            props.dealAction
              .submitDocumentPreDoc(documentInfo.id, data)
              .then(docSubmit => {
                resLength = resLength + 1
                if (resLength === documentsList.length) {
                  setDisableSubmit(false)
                  setUploadStatus(false)
                  showPreDocSuccess()
                }
              })
          } else {
            alert('Something went wrong !!')
          }
        } else {
          data = {
            dealId: dealData.id,
            doc: document.base64,
            filename: document.name,
            type: 'ENTRY'
          }
          addDocumentApiCall(data, hash).then(res => {
            if (res && res.status === 200) {
              resLength = resLength + 1
              if (resLength === documentsList.length) {
                verifyDocumentApiCall(hash).then(verify => {
                  setDisableSubmit(false)
                  setUploadStatus(false)

                  if (verify) {
                    props.router.push(
                      `${t('link_doc_collection')}${verify.hash}`
                    )
                  }
                })
              }
            } else {
              setDisableSubmit(false)
              setUploadStatus(false)

              alert('something went wrong')
            }
          })
        }
      })
    } else {
      setDisableSubmit(false)
      setUploadStatus(false)

      alert('Upload at least one document !')
    }
  }
  return (
    <React.Fragment>
      <BreadCrumbDyn />
      {props.router.asPath.includes('/dashboard/profile') ? null : (
        <Head title='Document Collection' />
      )}

      {uploadStatus ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: '100%',
            height: '100vh',
            zIndex: '999',
            backgroundColor: '#000',
            opacity: '.4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ClipLoader color='#fff' />
        </div>
      ) : null}
      <Container>
        <Row>
          <Col md={12}>
            <div className='document__collection--page'>
              <div className={styles['document__title--container']}>
                <h3 className=''>Upload document</h3>
              </div>
              <div className={styles['dealBody__profession']}>
                <p>{t('select_profession')}</p>
                <div className={styles['dealBody__profession--select']}>
                  <div
                    className={
                      styles['dealBody__profession--select--container']
                    }
                  >
                    <button
                      onClick={() => setSelectedProfession('working')}
                      className={
                        selectedProfession === 'working'
                          ? `${styles['dealBody__profession--btn']} ${styles['dealBody__profession--btn__selected']}`
                          : styles['dealBody__profession--btn']
                      }
                    >
                      <WorkIcon />
                    </button>
                    <b>{t('work_indivisual')}</b>
                  </div>
                  <div
                    className={
                      styles['dealBody__profession--select--container']
                    }
                  >
                    <button
                      onClick={() => setSelectedProfession('student')}
                      className={
                        selectedProfession === 'student'
                          ? `${styles['dealBody__profession--btn']} ${styles['dealBody__profession--btn__selected']}`
                          : styles['dealBody__profession--btn']
                      }
                    >
                      <SchoolIcon />
                    </button>
                    <b>{t('student')}</b>
                  </div>
                  <div
                    className={
                      styles['dealBody__profession--select--container']
                    }
                  >
                    <button
                      onClick={() => setSelectedProfession('owner')}
                      className={
                        selectedProfession === 'owner'
                          ? `${styles['dealBody__profession--btn']} ${styles['dealBody__profession--btn__selected']}`
                          : styles['dealBody__profession--btn']
                      }
                    >
                      <BusinessCenter />
                    </button>
                    <b>{t('business_owners')}</b>
                  </div>
                </div>
              </div>
              {selectedProfession ? (
                <div
                  className={styles['dealBody__upload--container']}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <h2
                    className={styles['document__title']}
                    style={{ marginBottom: '0px' }}
                  >
                    {t('required_documents')}
                  </h2>
                  <div className={styles['deal__upload-doc--example']}>
                    {t('required_documents_example')}
                  </div>
                  <ul
                    className={styles['dealBody__upload--list']}
                    style={{
                      listStyle: 'none'
                    }}
                  >
                    {selectedProfession === 'working' ? (
                      <>
                        {isLocal ? (
                          <>
                            <li className={styles['dealBody__upload--item']}>
                              1. {t('work_indivisual_required_1')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              2. {t('work_indivisual_required_2')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              3. {t('work_indivisual_required_3')}
                            </li>
                          </>
                        ) : (
                          <>
                            <li className={styles['dealBody__upload--item']}>
                              1. {t('upload_doc_passport')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              2. {t('upload_doc_visa')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              3. {t('work_indivisual_required_1')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              4. {t('work_indivisual_required_2')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              5. {t('work_indivisual_required_3')}
                            </li>
                          </>
                        )}
                      </>
                    ) : null}
                    {selectedProfession === 'student' ? (
                      <>
                        {isLocal ? (
                          <>
                            <li className={styles['dealBody__upload--item']}>
                              1. {t('student_required_1')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              2. {t('student_required_2')}
                            </li>
                          </>
                        ) : (
                          <>
                            <li className={styles['dealBody__upload--item']}>
                              1. {t('upload_doc_passport')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              2. {t('upload_doc_visa')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              3. {t('student_required_1')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              4. {t('student_required_2')}
                            </li>
                          </>
                        )}
                      </>
                    ) : null}
                    {selectedProfession === 'owner' && (
                      <>
                        {isLocal ? (
                          <>
                            <li className={styles['dealBody__upload--item']}>
                              1. {t('business_owners_required_1')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              2. {t('business_owners_required_2')}
                            </li>
                          </>
                        ) : (
                          <>
                            <li className={styles['dealBody__upload--item']}>
                              1. {t('upload_doc_passport')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              2. {t('upload_doc_visa')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              3. {t('business_owners_required_1')}
                            </li>
                            <li className={styles['dealBody__upload--item']}>
                              4. {t('business_owners_required_2')}
                            </li>
                          </>
                        )}
                      </>
                    )}
                  </ul>
                  <Dropzone
                    onDropAccepted={acceptedFiles => {
                      addImageToState(acceptedFiles)
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section
                        className={styles['dealBody__section']}
                        style={{ width: '100%' }}
                      >
                        <div {...getRootProps()}>
                          <input
                            className={styles['file-input']}
                            {...getInputProps()}
                          />
                          <div className={styles['dealBody__upload--dropbox']}>
                            {documentsList && documentsList.length > 0 ? (
                              documentsList.map((documentEach, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={styles['preview__box']}
                                    style={{ border: '1px solid #dfdfdf' }}
                                    onClick={e => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                    }}
                                  >
                                    {getPreviewImg(documentEach.url)}
                                    <span>{documentEach.name}</span>
                                    <DeleteIcon
                                      onClick={e => {
                                        e.preventDefault()
                                        e.stopPropagation()

                                        deleteImg(index)
                                      }}
                                      className={styles['delete-icon']}
                                    />
                                  </div>
                                )
                              })
                            ) : (
                              <p>Drop files here or click to upload</p>
                            )}
                          </div>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  <button
                    className={styles['customButton']}
                    style={{
                      marginTop: '2rem'
                    }}
                    disabled={disableSubmit}
                    onClick={() => uploadDocuments()}
                  >
                    Submit to SPEEDHOME
                  </button>
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = ({ deal, auth }) => {
  return {
    hash: deal.hash,
    dealData: deal.dealByHash,
    user: auth.user
  }
}

function actionsStateToProps (dispatch) {
  return {
    dealAction: bindActionCreators(dealAction, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export async function getServerSideProps () {
  return {}
}

export default connect(
  mapStateToProps,
  actionsStateToProps
)(withRouter(UploadDocsComponent))
