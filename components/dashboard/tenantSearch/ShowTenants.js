import React, { useEffect, useState } from 'react'

import { Row, Container, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { getUserData, sentChatRequestToOwner } from '../../../actions'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)
import Router from 'next/router'
import CONST from '../../../globalutilities/consts'

import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import PersonIcon from '@material-ui/icons/Person'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import styles from './ShowTenants.module.scss'

const ShowTenants = props => {
  const {
    tenantList,
    setTenantSearchLimitFun,
    propertyId,
    showExceedLimitmodal
  } = props
  const [tenantListArr, setTenantListArr] = useState([])

  useEffect(() => {
    let tenantListData = tenantList.map(item => {
      return { ...item, isStartConverWithTenant: false }
    })
    setTenantListArr(tenantListData)
  }, [])

  const startConverWithTenant = (index, req) => {
    getUserData().then(async res => {
      const hasLimitToSendCR =
        parseInt(res.payload.stats.tenantSearchChatRequestCount) <
        parseInt(res.payload.stats.tenantSearchChatRequestLimit)
      if (hasLimitToSendCR) {
        const payload = {
          chatRequestID: req.chatRequestId,
          propertyID: propertyId.id
        }
        const result = await sentChatRequestToOwner(payload)
        if (!result.success) {
          toast(result.message || 'Something went wrong', {
            autoClose: CONST.ToastTimeout,
            type: toast.TYPE.ERROR
          })
        } else {
          let setTenantArrVal = [...tenantListArr]
          setTenantArrVal[index].isStartConverWithTenant = true
          setTenantListArr(setTenantArrVal)
          setTenantSearchLimitFun(hasLimitToSendCR)
        }
      } else {
        setTenantSearchLimitFun(hasLimitToSendCR)
        setTimeout(() => {
          showExceedLimitmodal()
        }, 1000)
      }
    })
  }
  const onSentChatReq = id => {
    Router.push('/dashboard/chat')
  }

  if (tenantList && tenantList.length > 0) {
    return (
      <div id='content'>
        <Container>
          <Row style={{ cursor: 'pointer' }}>
            <div className={styles['tenant__listing--container']}>
              {tenantListArr &&
                tenantListArr.map((req, indx) => {
                  return (
                    <div className={styles['tenant__listing--item']} key={indx}>
                      <div className={styles['tenant__listing--img']}>
                        <img
                          src={
                            (req && req.tenant && req.tenant.avatar) ||
                            '/img/user_image.png'
                          }
                          alt='Teant Search User'
                        />
                      </div>
                      <div className={styles['tenant__listing--name']}>
                        <h5>
                          {(req && req.tenant && req.tenant.name) || ''}

                          {req &&
                            req.tenant &&
                            req.tenant.stats &&
                            req.tenant.stats.documentVerified && (
                              <sup>
                                <img
                                  src={'/img/verifyIcon_green.png'}
                                  alt='Verify Icon'
                                  width='20px'
                                />
                              </sup>
                            )}
                        </h5>
                      </div>

                      <div className={styles['tenant__listing--price']}>
                        <div
                          className={styles['tenant__listing--ico--container']}
                        >
                          <MonetizationOnIcon
                            className={styles['tenant__listing--ico']}
                          />
                          <span>
                            RM{' '}
                            {(req && req.tenant && req.tenant.maxBudget) || 0}
                          </span>
                        </div>
                        <div
                          className={styles['tenant__listing--ico--container']}
                        >
                          <PersonIcon
                            className={styles['tenant__listing--ico']}
                          />
                          <span>
                            {(req && req.tenant && req.tenant.paxNumber) || ''}{' '}
                            Pax
                          </span>
                        </div>
                      </div>
                      <p className={styles['tenant__listing--ico--container']}>
                        <EventAvailableIcon
                          className={styles['tenant__listing--ico']}
                        />
                        <span>
                          {dayjs(
                            req && req.tenant && req.tenant.movingDate
                          ).format('L') || ''}
                        </span>
                      </p>
                      <p className={styles['tenant__listing--ico--container']}>
                        <BusinessCenterIcon
                          className={styles['tenant__listing--ico']}
                        />
                        <span>
                          {(req && req.tenant && req.tenant.occupation) || ''}
                        </span>
                      </p>
                      <Button
                        className={styles['tenant__listing--btn']}
                        onClick={() => {
                          !req.isStartConverWithTenant
                            ? startConverWithTenant(indx, req)
                            : onSentChatReq(req.chatRequestId)
                        }}
                      >
                        {!req.isStartConverWithTenant
                          ? ' Start a converstation'
                          : 'Go to Chat'}
                      </Button>
                    </div>
                  )
                })}
            </div>
          </Row>
        </Container>
      </div>
    )
  }

  return (
    <div id='content'>
      <p>No tenant found</p>
    </div>
  )
}

export default ShowTenants
