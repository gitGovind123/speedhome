import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Button } from 'react-bootstrap'
import withSizes from 'react-sizes'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import Head from '../../../components/Common/Head'
import CONST from '../../../globalutilities/consts'
import BreadCrumb from '../../../components/Common/BreadCrumb'
import styles from './AboutPage.module.scss'

function AboutUs ({ isMobile }) {
  const { t } = useTranslation('common')
  return (
    <>
      <Head
        title={t('more:more_about_title_meta')}
        description={t('more:more_about_description_meta')}
      />

      <main id='main'>
        <BreadCrumb breadCrumb={CONST.moreAbout} />

        <div className='container'>
          <div className={styles['title']}>{t('more:about_us_headline')}</div>

          <div
            className={styles['flex-row-space-between']}
            style={{ marginBottom: '40px' }}
          >
            <div className='col-xs-12 col-md-6'>
              <div className={styles['subtitle']} style={{ marginTop: '20px' }}>
                {t('more:about_us_subtitle')}
              </div>
              <p className={styles['description']}>
                {t('more:about_us_back_1')}
              </p>
              <p className={styles['description']}>
                {t('more:about_us_back_2')}
              </p>
              <p className={styles['description']}>
                {t('more:about_us_back_3')}
              </p>
            </div>
            <div className='col-xs-12 col-md-6'>
              <iframe
                src='https://www.youtube.com/embed/TUwLWiIlZC0'
                width='100%'
                height={300}
              />
            </div>
          </div>

          <hr className={styles['hr-line']}></hr>

          <div className={styles['subtitle']} style={{ marginTop: '20px' }}>
            {t('more:about_us_stand_for_title')}
          </div>
          <div className={styles['flex-row-space-between']}>
            <div className='col-xs-12 col-md-4'>
              <SmallIcon
                src={'/img/no_discrimination.svg'}
                alt='No Discrimination'
              />
              <strong>{t('more:about_us_stand_1_title')}</strong>
              <p className={styles['description']}>
                {t('more:about_us_stand_1')}
              </p>
            </div>

            <div className='col-xs-12 col-md-4'>
              <SmallIcon
                src={'/img/secure_renting.svg'}
                alt='A Secure Renting Experience'
              />
              <strong>{t('more:about_us_stand_2_title')}</strong>
              <p className={styles['description']}>
                {t('more:about_us_stand_2')}
              </p>
            </div>

            <div className='col-xs-12 col-md-4'>
              <SmallIcon
                src={'/img/affordable_renting.svg'}
                alt='Affordable Renting'
              />
              <strong>{t('more:about_us_stand_3_title')}</strong>
              <p className={styles['description']}>
                {t('more:about_us_stand_3')}
              </p>
            </div>
          </div>

          <div
            className={`text-center  ${styles['button-container']}`}
            style={{ marginTop: '40px' }}
          >
            <div
              className={`${styles['subtitle']} ${styles['txt-blue']}`}
              style={{ marginBottom: '10px' }}
            >
              {t('more:about_us_btn_title')}
            </div>
            <div className={styles['flex-row-center']}>
              <a
                href='/more/tenant?utm_source=tenant&utm_medium=about_us'
                target='_blank'
                rel='noreferrer'
              >
                <Button
                  className={styles['btn-blue']}
                  style={{
                    marginRight: `${isMobile ? '0px' : '10px'}`,
                    marginBottom: `${isMobile ? '10px' : '0px'}`
                  }}
                >
                  {t('more:about_us_btn_1')}
                </Button>
              </a>

              <a
                href='/more/landlord?utm_source=landlord&utm_medium=about_us'
                target='_blank'
                rel='noreferrer'
              >
                <Button
                  className={styles['btn-blue']}
                  style={{ marginLeft: `${isMobile ? '0px' : '10px'}` }}
                >
                  {t('more:about_us_btn_2')}
                </Button>
              </a>
            </div>
          </div>

          <div className={styles['subtitle']} style={{ marginTop: '20px' }}>
            {t('more:about_us_value_title')}
          </div>
          <div className={styles['flex-row-space-between']}>
            <div className='col-xs-12 col-md-6'>
              <SmallIcon src={'/img/equality.svg'} alt='Equality' />
              <strong>{t('more:about_us_value_1')}</strong>
              <p className={styles['description']}>
                {t('more:about_us_value_1_1')}
              </p>
              <p className={styles['description']}>
                {t('more:about_us_value_1_2')}
              </p>
            </div>

            <div className='col-xs-12 col-md-6'>
              <SmallIcon src={'/img/mindblown.svg'} alt='Mindblown' />
              <strong>{t('more:about_us_value_2')}</strong>
              <p className={styles['description']}>
                {t('more:about_us_value_2_1')}
              </p>
              <p className={styles['description']}>
                {t('more:about_us_value_2_2')}
              </p>
            </div>

            <div className='col-xs-12 col-md-6'>
              <SmallIcon src={'/img/fun.svg'} alt='Fun with serious intent!' />
              <strong>{t('more:about_us_value_3')}</strong>
              <p className={styles['description']}>
                {t('more:about_us_value_3_1')}
              </p>
              <p className={styles['description']}>
                {t('more:about_us_value_3_2')}
              </p>
            </div>

            <div className='col-xs-12 col-md-6'>
              <SmallIcon
                src={'/img/do_the_right_thing.svg'}
                alt='Do the right thing'
              />
              <strong>{t('more:about_us_value_4')}</strong>
              <p className={styles['description']}>
                {t('more:about_us_value_4_1')}
              </p>
              <p className={styles['description']}>
                {t('more:about_us_value_4_2')}
              </p>
            </div>
          </div>

          <hr className={styles['hr-line']}></hr>

          <div
            className={styles['flex-row-space-between']}
            style={{ marginBottom: '40px' }}
          >
            <div
              className='col-xs-12 col-md-6'
              style={{ marginBottom: '20px' }}
            >
              <div className={styles['subtitle']}>
                {t('more:about_us_hiring_title')}
              </div>
              <p className={styles['description']}>
                {t('more:about_us_hiring')}
              </p>
              <a
                href='https://speedhome.com/blog/careers'
                target='_blank'
                rel='noreferrer'
              >
                <Button
                  className={`${styles['btn-blue']} ${
                    isMobile ? 'width-100' : ''
                  }`}
                >
                  {t('more:about_us_hiring_btn')}
                </Button>
              </a>
            </div>
            <div className='col-xs-12 col-md-6'>
              <iframe
                src='https://www.youtube.com/embed/qju5JGrbFGg'
                width='100%'
                height={300}
              />
            </div>
          </div>

          <hr className={styles['hr-line']}></hr>

          <div className={styles['subtitle']} style={{ marginTop: '20px' }}>
            {t('more:about_us_achievement_title')}
          </div>
          <div
            className={styles['flex-row-start']}
            style={{ marginBottom: '40px' }}
          >
            <div className='col-xs-12 col-md-4'>
              <strong className={styles['txt-blue']}>
                {t('more:about_us_achievement_1')}
              </strong>
              <p className={styles['description']}>
                {t('more:about_us_achievement_1_1')}
              </p>
            </div>

            <div className='col-xs-12 col-md-4'>
              <strong className={styles['txt-blue']}>
                {t('more:about_us_achievement_2')}
              </strong>
              <p className={styles['description']}>
                {t('more:about_us_achievement_2_1')}
              </p>
            </div>

            <div className='col-xs-12 col-md-4'>
              <strong className={styles['txt-blue']}>
                {t('more:about_us_achievement_3')}
              </strong>
              <p className={styles['description']}>
                {t('more:about_us_achievement_3_1')}
              </p>
            </div>

            <div className='col-xs-12 col-md-4'>
              <strong className={styles['txt-blue']}>
                {t('more:about_us_achievement_4')}
              </strong>
              <p className={styles['description']}>
                {t('more:about_us_achievement_4_1')}
              </p>
            </div>

            <div className='col-xs-12 col-md-4'>
              <strong className={styles['txt-blue']}>
                {t('more:about_us_achievement_5')}
              </strong>
              <p className={styles['description']}>
                {t('more:about_us_achievement_5_1')}
              </p>
            </div>
          </div>

          <hr className={styles['hr-line']}></hr>

          <div className={styles['subtitle']} style={{ marginTop: '20px' }}>
            {t('more:about_us_press_title')}
          </div>
          <div style={{ padding: '0 40px' }}>
            <i>&quot;{t('more:about_us_press_1')}&quot;</i>
            <br></br>
            <strong>
              <i>- BFM</i>
            </strong>
            <div style={{ margin: '20px' }} />
            <i>{t('more:about_us_press_2')}</i>
            <br></br>
            <strong>
              <i>- Malay Mail</i>
            </strong>
          </div>

          <hr className={styles['hr-line']}></hr>

          <div className={styles['subtitle']} style={{ marginTop: '20px' }}>
            Also featured in
          </div>
          <div
            className={styles['flex-row-space-around']}
            style={{ marginBottom: '40px' }}
          >
            <LazyLoadImage
              effect='blur'
              src={'/img/digitalnewsasia.png'}
              alt='Digital News Asia'
              className='col-xs-12'
            />
            <LazyLoadImage
              effect='blur'
              src={'/img/sinchew.png'}
              alt='Sin Chew'
            />
            <LazyLoadImage
              effect='blur'
              src={'/img/astro_awani.png'}
              alt='Astro Awani'
            />
            <LazyLoadImage
              effect='blur'
              src={'/img/techinasia.png'}
              alt='TechInAsia'
            />
            <LazyLoadImage
              effect='blur'
              src={'/img/straits_times.png'}
              alt='Straits Times'
            />
            <LazyLoadImage
              effect='blur'
              src={'/img/utusan_online.png'}
              alt='Utusan Online'
              className='long-logo'
            />
          </div>
        </div>
      </main>
    </>
  )
}

const SmallIcon = ({ src, alt }) => (
  <img
    style={{ display: 'block', marginBottom: '10px' }}
    loading='lazy'
    alt={alt}
    src={src}
    width={36}
  />
)

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 767
})
export async function getServerSideProps () {
  return {}
}

export default withSizes(mapSizesToProps)(AboutUs)
