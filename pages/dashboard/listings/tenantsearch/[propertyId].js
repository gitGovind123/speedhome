import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { withRouter } from 'next/router'
import Head from '../../../../components/Common/Head'
import CONST from '../../../../globalutilities/consts'
import BreadCrumb from '../../../../components/Common/BreadCrumb'

import ChatwithTenantModal from '../../../../components/dashboard/tenantSearch/ChatwithTenantModal'
import GotoChatModal from '../../../../components/dashboard/tenantSearch/GotoChatModal'

import AppDownloadModal from '../../../../components/dashboard/tenantSearch/AppDownloadModal'

import {
  sentChatRequestToOwner,
  getPropertyFromRef,
  getTenantSearchChatReq
} from '../../../../actions/property'

import ShowTenants from '../../../../components/dashboard/tenantSearch/ShowTenants'

import {
  getToken,
  getDeviceId,
  getUserId
} from '../../../../globalutilities/helpers'
import { ClipLoader } from 'react-spinners'
import { ProgressBar } from 'react-bootstrap'
import { getUserData } from '../../../../actions'

const TenantSearch = props => {
  const [isLoading, setisLoading] = useState(true)
  const [isOpenChatReqModal, setisOpenChatReqModal] = useState(false)
  const [isGotoChatModal, setisGotoChatModal] = useState(false)
  const [property, setproperty] = useState({})
  const [tenantList, setTenantList] = useState(null)
  const [chatReqFor, setchatReqFor] = useState(null)
  const [tenantSearchLimit, setTenantSearchLimit] = useState(false)
  const [label, setLabel] = useState('You have started a chat wth the tenant.')
  const [searchLimitExceeded, setSearchLimitExceeded] = useState(false)

  useEffect(() => {
    if (getToken() && props.router.query && props.router.query.propertyId) {
      const cookies = {
        authToken: getToken(),
        xDeviceId: getDeviceId()
      }
      getPropertyFromRef(props.router.query.propertyId, cookies).then(
        propertyRes => {
          if (propertyRes) {
            setproperty(propertyRes)
            getTenantSearchChatReq(
              {
                lat: propertyRes.latitude,
                lng: propertyRes.longitude
              },
              cookies
            ).then(chatq => {
              if (chatq) {
                if (chatq.success) {
                  if (chatq.data) {
                    const filteredData = chatq.data.filter(filterdata => {
                      return (
                        parseInt(filterdata.tenantId) !== parseInt(getUserId())
                      )
                    })
                    setTenantList(filteredData)
                  } else {
                    setTenantList({})
                  }
                }
                setisLoading(false)
              }
            })
          }
        }
      )
    }
  }, [])

  const renderChatRequestLimitCount = () => {
    getUserData().then(res => {
      if (res && res.type === 'SUCCESS') {
        let requestCount = res.payload.stats.tenantSearchChatRequestCount
        let searchLimit = res.payload.stats.tenantSearchChatRequestLimit
        setLabel(
          `You have started a chat wth the tenant. (Daily limit: ${requestCount}/${searchLimit} )`
        )
      }
    })
  }

  const onSentChatReq = async () => {
    if (!chatReqFor) return
    const payload = {
      chatRequestID: chatReqFor.chatRequestId,
      propertyID: property.id
    }
    const result = await sentChatRequestToOwner(payload)
    if (!result.success) {
      toast(`${result.message} ` || 'Something went wrong', {
        autoClose: CONST.ToastTimeout,
        type: toast.TYPE.ERROR
      })
      setisOpenChatReqModal(false)
    } else {
      setisOpenChatReqModal(false)
      setisGotoChatModal(true)
    }
  }
  const setTenantSearchLimitFun = hasLimit => {
    if (hasLimit) {
      renderChatRequestLimitCount()
      setTenantSearchLimit(true)
      setTimeout(() => {
        setTenantSearchLimit(false)
      }, 5000)
    }
  }

  return (
    <React.Fragment>
      {tenantSearchLimit ? (
        <ProgressBar
          className='tenant_chat_limit_progress_bar'
          now={100}
          label={label}
        />
      ) : null}
      <ToastContainer />
      <Head title='Tenant Search' />
      <main id='main' className='tenant-search'>
        <BreadCrumb breadCrumb={CONST.dashboardTenantSearch} />
        <div className='container'>
          <div className='mt-4'>
            <h4>Tenant Search</h4>
          </div>
          <small>
            These tenant are looking for a place near you, why not send them a
            chat request?
          </small>
          <div className='results-main'>
            <div className='grid-map-container'>
              <div className='mt-2'>
                {isOpenChatReqModal ? (
                  <ChatwithTenantModal
                    chatRequestId={
                      (chatReqFor && chatReqFor.chatRequestId) || ''
                    }
                    name={
                      (chatReqFor &&
                        chatReqFor.tenant &&
                        chatReqFor.tenant.name) ||
                      ''
                    }
                    budget={(chatReqFor && chatReqFor.budget) || ''}
                    onClose={() => {
                      setchatReqFor(null)
                      setisOpenChatReqModal(false)
                    }}
                    onSentChatReq={onSentChatReq}
                  />
                ) : null}
                {isGotoChatModal ? (
                  <GotoChatModal
                    onClose={() => {
                      setchatReqFor(null)
                      setisGotoChatModal(false)
                    }}
                  />
                ) : null}

                {searchLimitExceeded ? (
                  <AppDownloadModal
                    onClose={() => {
                      setSearchLimitExceeded(false)
                    }}
                  />
                ) : null}
              </div>
            </div>
            {isLoading ? (
              <div
                style={{
                  height: '30vh',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <ClipLoader color='#4885ed' />
              </div>
            ) : (
              <ShowTenants
                tenantList={tenantList}
                propertyId={property}
                setTenantSearchLimitFun={hasLimit =>
                  setTenantSearchLimitFun(hasLimit)
                }
                showExceedLimitmodal={() => setSearchLimitExceeded(true)}
                openChatReqModal={chatReqFor => {
                  setisOpenChatReqModal(true)
                  setchatReqFor(chatReqFor)
                }}
              />
            )}
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

function mapStateToProps (state) {
  return {
    language: state.language
  }
}

export async function getServerSideProps () {
  return {}
}

export default withRouter(connect(mapStateToProps)(TenantSearch))
