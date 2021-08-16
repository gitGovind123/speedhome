import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import Head from '../../../components/Common/Head'

import InsuranceStep from '../../../components/services/InsuranceStep'
import InsuranceCard from '../../../components/services/InsuranceCard'

import styles from './insurance.module.scss'

const Insurance = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <Head title='Replace deposit with insurance and rent out your property 5x faster with up to 20x better protection'></Head>
      <div className={styles['insurancebanner-img']}>
        <div className={styles['insurancebanner__text--container']}>
          <h1 className={styles['insurancebanner__text--header']}>
            {t('service:insurance_banner_header')}
          </h1>
          <p className={styles['insurancebanner__text--style']}>
            {t('service:insurance_banner_text')}
          </p>
          <Link href={'/post'}>
            <button
              className={`btn yellow-btn  ${styles['zerobanner__upper-button']}`}
            >
              {t('service:insurance_banner_button')}
            </button>
          </Link>
        </div>
      </div>
      <Container>
        <div className={styles['insurancebanner__text--container-desktop']}>
          <div className={styles['insurancebanner__text--header-desktop']}>
            {t('service:insurance_banner_header')}
          </div>
          <p className={styles['insurancebanner__text--style-desktop']}>
            {t('service:insurance_banner_text')}
          </p>
          <button
            className={`btn yellow-btn  ${styles['zerobanner__upper-button']}`}
          >
            {t('service:insurance_banner_button')}
          </button>
        </div>
      </Container>
      <div className={styles['insurance__light-gray']}>
        <Container>
          <div className={styles['insurance_head']}>
            {t('service:insurance_head')}
          </div>
          <InsuranceStep styles={styles} />
          <div className={styles['insurance_step--text']}>
            <div>{t('service:insurance_step1')}</div>
            <div>{t('service:insurance_step2')}</div>
            <div>{t('service:insurance_step3')}</div>
            <div>{t('service:insurance_step4')}</div>
            <div>{t('service:insurance_step5')}</div>
            <div>{t('service:insurance_step6')}</div>
            <div>{t('service:insurance_step7')}</div>
            <img
              className={styles['services_insurance-img']}
              src={'/img/Landlord_Insurance_Plan_Transparent.png'}
              alt='Landlord_Insurance_Plan_Transparent'
            />
            <div className='pt-3'>
              <div className='pt-1'>
                <i>{t('service:insurance_step8')}</i>
              </div>
              <div className='pt-1'>
                <i>{t('service:insurance_step9')}</i>
              </div>
              <div className='pt-1'>
                <i>{t('service:insurance_step10')}</i>
              </div>
            </div>
            <div className={styles['insurance_step--btn']}>
              <Link href={'/post'}>
                <button
                  className={`btn yellow-btn  ${styles['zerobanner__upper-button']}`}
                >
                  {t('service:insurance_banner_button')}
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className='container mt-5 mb-5'>
          <div className='row'>
            <div className={`col-md-6 ${styles['claiming_left_content']}`}>
              <div className={styles['claiming_left_head']}>
                {t('service:insurance_claiming_process_left_head')}
              </div>
              <p className={styles['claiming_left_text']}>
                {t('service:insurance_claiming_process_left_text')}
              </p>
            </div>

            <div className='col-md-6'>
              <ul className={styles['timeline']}>
                <li>
                  <div className={styles['day__head--root']}>
                    {t('service:insurance_claiming_process_day1')}
                  </div>
                  <p className={styles['day_text--head']}>
                    {t('service:insurance_claiming_process_day1_content_1')}
                  </p>
                  <p className={styles['day_text']}>
                    {t('service:insurance_claiming_process_day1_content_2')}
                  </p>
                </li>
                <li>
                  <div
                    className={styles['day__head--root']}
                    style={{ marginBottom: '30px' }}
                  >
                    {t('service:insurance_claiming_process_day2_3')}
                  </div>
                </li>
                <li>
                  <div className={styles['day__head--root']}>
                    {t('service:insurance_claiming_process_day_4')}
                  </div>
                  <p className={styles['day_text--head']}>
                    {t('service:insurance_claiming_process_day4_content1')}
                  </p>
                  <p className={styles['day_text']}>
                    {t('service:insurance_claiming_process_day4_content2')}
                  </p>
                  <p className={styles['day_text']}>
                    {t('service:insurance_claiming_process_day4_content3')}
                  </p>
                </li>
                <li>
                  <div
                    className={styles['day__head--root']}
                    style={{ marginBottom: '30px' }}
                  >
                    {t('service:insurance_claiming_process_day5_6')}
                  </div>
                </li>
                <li>
                  <div className={styles['day__head--root']}>
                    {t('service:insurance_claiming_process_day_7')}
                  </div>
                  <p className={styles['day_text--head']}>
                    {t('service:insurance_claiming_process_day7_content1')}
                  </p>
                  <p className={styles['day_text']}>
                    {t('service:insurance_claiming_process_day7_content2')}
                  </p>
                  <p className={styles['day_text']}>
                    {t('service:insurance_claiming_process_day7_content3')}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <div className={styles['insurance__light-gray']}>
        <Container>
          <InsuranceCard styles={styles} />
          <div className={styles['insurance-claim']}>
            <div className={styles['insurance-claim__Text']}>
              {t('service:insurance_head2')}
            </div>
            <a
              href={`https://${t('service:insurance_email')}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {t('service:insurance_email')}
            </a>
          </div>
        </Container>
      </div>
      <Container>
        <div className={styles['discover-container']}>
          <img
            className={styles['discover-img']}
            src='/img/insurance-key.jpg'
          />
          <div className={styles['discover-right_content']}>
            <div className={styles['discover-head']}>
              {t('service:insurance_head3')}
            </div>
            <div className={styles['discover-text']}>
              {t('service:insurance_head3_text')}
            </div>
            <div className={styles['discover-btn-container']}>
              <Link href={'/post'}>
                <button className='btn yellow-btn'>
                  {t('service:rental_banner_button')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getServerSideProps () {
  return {}
}

export default Insurance
