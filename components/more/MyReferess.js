import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import useTranslation from 'next-translate/useTranslation'

import env from '../../env'
import { getUserId, getToken } from '../../globalutilities/helpers'

import ReferKnowMore from './referKnowMore'

const MyReferees = ({ styles }) => {
  const [myReferess, setMyReferess] = useState(null)

  const { t } = useTranslation('common')

  useEffect(() => {
    if (Cookies.get('authToken'))
      axios
        .get(`${env.API_HOST}referral/${getUserId()}/referees/list`, {
          headers: {
            Authorization: getToken(),
            'Content-Type': 'application/json'
          },
          data: null
        })
        .then(data => {
          data.data.length == 0 ? setMyReferess(null) : setMyReferess(data.data)
        })
        .then(err => {})
  }, [getToken()])

  return (
    <div>
      {myReferess !== null ? (
        <div className={styles['myrefree']}>
          <div className={styles['referrer-card']}>
            <div className={styles['refer-logo']}>
              <img src={'/img/icons/people_alt-grey-24px.svg'} alt='' />
            </div>
            <div className={styles['refer-heading']}>
              {t('more:my_referess')}
            </div>
            <div className={styles['refers-card__root']}>
              {[].concat(myReferess).map((refress, idx) => (
                <div key={idx} className={styles['refer-card__body']}>
                  <div className={styles['refer-body__refers-details']}>
                    <div className={styles['refers__email']}>
                      {refress && refress.email}
                    </div>
                    <div className={styles['refers__rented-out']}>
                      <span>{t('more:rented_out_earning')}</span>{' '}
                      <span>{`(${refress && refress.numberOfDeal})`}</span>
                    </div>
                    <div className={styles['refers__listed']}>
                      <span>{t('more:rented_listed_earning')}</span>{' '}
                      <span>{`(${refress && refress.numberOfListing})`}</span>
                    </div>
                    <div className={styles['refers__listed']}>
                      <span>{t('more:rented_cr_earning')}</span>{' '}
                      <span>{`(${refress && refress.numberOfCr})`}</span>
                    </div>
                  </div>
                  <div className={styles['refers__reward']}>
                    RM{refress && refress.reward}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ReferKnowMore alignMiddle styles={styles} />
        </div>
      ) : (
        <div className={styles['myrefree']}>
          <div className={styles['no-refer__card']}>
            <div className={styles['no-refer__logo']}>
              <img src={'/img/icons/assignment-grey-24px.svg'} alt='' />
            </div>
            <div className={styles['no-refer-body']}>
              <div className={styles['no-refer-head']}>
                {t('more:no_referess')}
              </div>
              <div className={styles['no-refer-txt']}>
                {t('more:no_refer_text')}
              </div>
            </div>

            <ReferKnowMore alignMiddle styles={styles} />
          </div>
        </div>
      )}
    </div>
  )
}

export default MyReferees
