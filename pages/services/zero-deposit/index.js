import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import Head from '../../../components/Common/Head'
import styles from './zeroDeposit.module.scss'

const Zero = () => {
  const [nationality, setNationality] = useState('malaysia')
  const { t } = useTranslation('common')

  return (
    <>
      <Head title='Zero Deposit Eligibility'></Head>
      <div className={styles['zerobanner']}>
        <div className={styles['zerobanner__text--container']}>
          <h1 className={styles['zerobanner__text--header']}>
            {t('service:zero_banner_header')}
          </h1>
          <p className={styles['zerobanner__text--style']}>
            {t('service:zero_banner_text')}
          </p>
          <Link href={'/post'}>
            <button
              className={`btn yellow-btn ${styles['zerobanner__upper-button']}`}
            >
              {t('service:zero_banner_button')}
            </button>
          </Link>
        </div>
      </div>
      <Container>
        <div className={styles['zerobanner__text--container-desktop']}>
          <h1 className={styles['zerobanner__text--header-desktop']}>
            {t('service:zero_banner_header')}
          </h1>
          <p className={styles['zerobanner__text--style-desktop']}>
            {t('service:zero_banner_text')}
          </p>
          <button
            className={`btn yellow-btn ${styles['zerobanner__upper-button-desktop']}`}
          >
            {t('service:zero_banner_button')}
          </button>
        </div>

        <div className={styles['zero__heading-container']}>
          <h1 className={styles['zero__heading--bold']}>
            {t('service:zero_text1')}
          </h1>
          <p className={styles['zero__heading--text']}>
            {t('service:zero_text2')}
          </p>
          <p className={styles['zero__heading--text']}>
            {t('service:zero_text3')}
          </p>
        </div>

        <div className={styles['zero-process__container']}>
          <h1 className={styles['zero-process__heading']}>
            {t('service:zero_process')}
          </h1>
          <div className={styles['zero-process__nationality-container']}>
            <div
              onClick={() => setNationality('malaysia')}
              className={
                nationality == 'malaysia'
                  ? `${styles['zero-process__malaysia']} ${styles['zero-process_active-tag']}`
                  : styles['zero-process__malaysia']
              }
            >
              {t('service:zero_malaysian')}
            </div>
            <div
              onClick={() => setNationality('international')}
              className={
                nationality == 'international'
                  ? `${styles['zero-process__international']} ${styles['zero-process_active-tag']}`
                  : styles['zero-process__international']
              }
            >
              {t('service:zero_international')}
            </div>
          </div>
          {nationality == 'malaysia' ? (
            <div className={styles['process-icon-text__container']}>
              <div className={styles['process-icon-text__root']}>
                <div className={styles['process-icon-wrapper']}>
                  <img src='/img/icons/assignment_ind-24px.svg' alt='' />
                </div>
                <div className={styles['process-icon-text']}>
                  {t('service:zero_ic')}
                </div>
              </div>
              <div className={styles['process-icon-text__root']}>
                <div className={styles['process-icon-wrapper']}>
                  <img src='/img/icons/assignment_turned_in-24px.svg' alt='' />
                </div>
                <div className={styles['process-icon-text']}>
                  {t('service:zero_orrer_letter')}
                </div>
              </div>
              <div className={styles['process-icon-text__root']}>
                <div className={styles['process-icon-wrapper']}>
                  <img src='/img/icons/assignment-24px.svg' alt='' />
                </div>
                <div className={styles['process-icon-text']}>
                  {t('service:zero_bank')}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles['process-icon-text__container']}>
              <div className={styles['process-icon-text__root']}>
                <div className={styles['process-icon-wrapper']}>
                  <img src='/img/icons/assignment_ind-24px.svg' alt='' />
                </div>
                <div className={styles['process-icon-text']}>
                  {t('service:zero_visa')}
                </div>
              </div>
              <div className={styles['process-icon-text__root']}>
                <div className={styles['process-icon-wrapper']}>
                  <img src='/img/icons/assignment_turned_in-24px.svg' alt='' />
                </div>
                <div className={styles['process-icon-text']}>
                  {t('service:zero_orrer_letter')}
                </div>
              </div>
              <div className={styles['process-icon-text__root']}>
                <div className={styles['process-icon-wrapper']}>
                  <img src='/img/icons/assignment-24px.svg' alt='' />
                </div>
                <div className={styles['process-icon-text']}>
                  {t('service:zero_bank_int')}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles['zero-bottom__container']}>
          <div className={styles['zero-process__text']}>
            {t('service:zero_text4')}
          </div>
          <div className={styles['zero-process__text']}>
            {t('service:zero_text5')}
          </div>
          <div className={styles['zero-process__btn']}>
            <Link href={'/post'}>
              <button className='btn yellow-btn'>
                {t('service:zero_btn_text')}
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  )
}
export async function getServerSideProps () {
  return {}
}

export default Zero
