import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import env from '../../env'
import { getUserId, getToken } from '../../globalutilities/helpers'

const Earning = ({ styles }) => {
  const [earnings, setEarnings] = useState({})

  const { t } = useTranslation('common')

  useEffect(() => {
    axios
      .get(`${env.API_HOST}referral/${getUserId()}/earn`, {
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json'
        },
        data: null
      })
      .then(data => {
        setEarnings(data.data)
      })
      .then(err => {})
  }, [])
  return (
    <div className={styles['my-earnings-root']}>
      <div className={styles['refer-card']}>
        <div className={styles['refer-logo']}>
          <img src={'/img/icons/attach_money-grey-24px.svg'} alt='' />
        </div>
        <div className={styles['earning-card__body-head']}>
          <div className={styles['earning__head']}>{t('more:my_earnings')}</div>
          <div className={styles['earning-card__body-content']}>
            <div
              className={`${styles['earn-content']} ${styles['earning__content--rented']}`}
            >
              <div className={styles['earning__text']}>
                {t('more:rented_out_earning')}
              </div>
              <div className={styles['earning__ammount']}>
                {earnings.numberOfDeal}
              </div>
            </div>
            <div
              className={`${styles['earn-content']} ${styles['earning__content--listed']}`}
            >
              <div className={styles['earning__text']}>
                {t('more:rented_listed_earning')}
              </div>
              <div className={styles['earning__ammount']}>
                {earnings.numberOfListing}
              </div>
            </div>
            <div
              className={`${styles['earn-content']} ${styles['earning__content--cr']}`}
            >
              <div className={styles['earning__text']}>
                {t('more:rented_cr_earning')}
              </div>
              <div className={styles['earning__ammount']}>
                {earnings.numberOfCr}
              </div>
            </div>
            <hr className={styles['earn-hr']} />
            <div
              className={`${styles['earn-content']} ${styles['earning__content--reward']}`}
            >
              <div className={styles['earning__text']}>
                {t('more:rented_reward_earning')}
              </div>
              <div className={styles['earning__ammount']}>
                RM&nbsp;
                {earnings.reward}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Earning
