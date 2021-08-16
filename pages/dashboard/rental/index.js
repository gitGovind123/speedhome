import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import dayjs from 'dayjs'
import Alert from 'react-bootstrap/Alert'
import CalenderIcon from '@material-ui/icons/DateRangeOutlined'

import Head from '../../../components/Common/Head'
import BreadCrumbDyn from '../../../components/Common/BreadCrumbDyn'
import Loader from '../../../components/Common/Loader'
import * as rentalActions from '../../../actions/rental'
import { getToken, getUserId } from '../../../globalutilities/helpers'
import styles from './rental.module.scss'

const SHORT_DATE = 'MMMM D, YYYY'

const Rental = props => {
  const [orders, setOrders] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation('common')
  useEffect(() => {
    if (props.user) {
      getRentalData(props.user)
    }
  }, [props.user])

  const getRentalData = async userData => {
    setIsLoading(true)
    const user = {
      id: getUserId(),
      authToken: getToken(),
      phoneNumber: userData.phoneNumber
    }
    const result = await rentalActions.getRentaltPropertiesList(user)

    setOrders(result.success ? (result.data && result.data.orders) || [] : [])
    setIsLoading(false)
  }

  const pushToPayUrl = async (invoice, item) => {
    if (item.isLandlord === false && invoice.status === 'unpaid') {
      const { rentalActions } = props
      const data = {
        amount: invoice.total.replace(/[^0-9.]+/g, ''),
        currency: invoice.total.replace(/[^a-zA-Z]+/g, ''),
        paymentMethod: 'fpx'
      }

      const result = await rentalActions.getPayLink(
        invoice.user_displayId,
        data
      )
      if (result.data) {
        window.open(result.data, '_blank')
      }
    }
  }

  return (
    <React.Fragment>
      <Head title={t('dashboard:rental_collection_title')} />
      <main id='main' className={`inner-pages ${styles['rental-page']}`}>
        <BreadCrumbDyn />
        <div className='container'>
          {isLoading ? (
            <Loader />
          ) : orders && orders.length > 0 ? (
            <div className={`card ${styles['card-v2']}`}>
              <div className={`${styles['card-body']}  row`}>
                {orders.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles['pro-col']}  pro-grid col-xs-12 col-sm-6`}
                  >
                    <div className={styles['card-thumb']}>
                      <div className={styles['thumb-top']}>
                        <h4 className={styles['card-title']}>
                          {item.propertyName || ''}
                        </h4>
                        <strong className={styles['thumb-title']}>
                          {item.tenantName || ''}
                        </strong>
                        <div className={styles['thumb-date']}>
                          {/* <i className='far fa-calendar-alt' /> */}
                          <CalenderIcon
                            style={{
                              marginRight: '3px',
                              fontSize: '1.2em'
                            }}
                          />
                          <span>
                            From&nbsp;
                            {dayjs.unix(item.startDate).format(SHORT_DATE)}
                            &nbsp;to&nbsp;
                            {dayjs.unix(item.endDate).format(SHORT_DATE)}
                          </span>
                        </div>
                      </div>
                      <div className={styles['thumb-frame']}>
                        <div className='thumb-top-row'>
                          <div className='card-body'>
                            <strong className='thumb-title'>Invoices</strong>
                            <span>
                              {item.invoices.map((invoice, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={`${styles['thumb-date']} row`}
                                  >
                                    <div className='col-sm-6 text-left'>
                                      <CalenderIcon
                                        style={{
                                          marginRight: '3px',
                                          fontSize: '1.2em'
                                        }}
                                      />
                                      {/* <i className='far fa-calendar-alt' />{' '} */}
                                      <span style={{ paddingRight: '5px' }}>
                                        {invoice.type === 'Rental'
                                          ? invoice.type
                                          : invoice.type
                                              .split('Utility-Fee')
                                              .join('')}
                                      </span>
                                      {dayjs
                                        .unix(invoice.dueDate)
                                        .format(SHORT_DATE)}
                                      <span className='invoice-total'>
                                        {' - '}
                                        {invoice.total.replace('MYR', 'RM')}
                                      </span>
                                    </div>
                                    <div
                                      className='col-sm-6 text-right'
                                      style={{
                                        color:
                                          invoice.status === 'unpaid'
                                            ? 'red'
                                            : 'green'
                                      }}
                                    >
                                      <span
                                        style={{
                                          textTransform: 'uppercase'
                                        }}
                                      >
                                        <div
                                          role='presentation'
                                          className={
                                            invoice.status === 'cancelled'
                                              ? 'btn btn_secondary_cancel'
                                              : 'btn btn-curv btn-primary btn-primary-filled'
                                          }
                                          onClick={() =>
                                            pushToPayUrl(invoice, item)
                                          }
                                        >
                                          {invoice.status === 'unpaid' &&
                                          item.isLandlord === false
                                            ? 'PAY-NOW'
                                            : invoice.status}
                                        </div>
                                      </span>
                                    </div>
                                  </div>
                                )
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {item.logs && item.logs.length > 0 ? (
                        <div className='thumb-frame log-thumbframe'>
                          <div className='thumb-top-row'>
                            <div className='card-body'>
                              <strong className='thumb-title log-title'>
                                Logs
                              </strong>
                              <div className='log-container'>
                                <ul>
                                  {item.logs
                                    .sort(
                                      (a, b) => b.dateCreated - a.dateCreated
                                    )
                                    .map(log => {
                                      return (
                                        <li key={log.id}>
                                          <p className='log-head'>
                                            {dayjs
                                              .unix(log.dateCreated)
                                              .format('DD-MM-YYYY')}
                                          </p>
                                          <div className='log-info'>
                                            <div className='log-info-status'>
                                              <span className='time'>
                                                {dayjs
                                                  .unix(log.dateCreated)
                                                  .format('h:mm a')}
                                              </span>
                                              <span>{log.message}</span>
                                            </div>
                                          </div>
                                        </li>
                                      )
                                    })}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                height: '50vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Alert variant='info'>
                <Alert.Heading>No rental collection found</Alert.Heading>
              </Alert>
            </div>
          )}
        </div>
      </main>
    </React.Fragment>
  )
}

function mapStateToProps (state) {
  return {
    language: state.language,
    user: state.auth.user
  }
}

function actionsStateToProps (dispatch) {
  return {
    rentalActions: bindActionCreators(rentalActions, dispatch)
  }
}

export async function getServerSideProps () {
  return {}
}

export default connect(mapStateToProps, actionsStateToProps)(Rental)
