import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import useTranslation from 'next-translate/useTranslation'
import Head from '../../../components/Common/Head'
import Link from 'next/link'

import styles from './rentalCollection.module.scss'

const Rental = () => {
  const [windowMain, setWindowMain] = useState(null)
  const { t } = useTranslation('common')
  useEffect(() => {
    if (window) {
      setWindowMain(window)
    }
  }, [])

  return (
    <>
      <Head title={t('service:rental_banner_header')} />
      <div className={styles['rentalbanner']}>
        <div className={styles['rentalbanner__text--container']}>
          <h1 className={styles['rentalbanner__text--header']}>
            {t('service:rental_banner_header')}
          </h1>
          <p className={styles['rentalbanner__text--style']}>
            {t('service:rental_banner_text')}
          </p>
          <Link href={'/post'}>
            <button
              className={`btn yellow-btn  ${styles['zerobanner__upper-button']}`}
            >
              {t('service:rental_banner_button')}
            </button>
          </Link>
        </div>
      </div>
      <Container>
        <div className={styles['rentalbanner__text--container-desktop']}>
          <h1 className={styles['rentalbanner__text--header-desktop']}>
            {t('service:rental_banner_header')}
          </h1>
          <p className={styles['rentalbanner__text--style-desktop']}>
            {t('service:rental_banner_text')}
          </p>
          <Link href={'/post'}>
            <button
              className={`btn yellow-btn  ${styles['zerobanner__upper-button']}`}
            >
              {t('service:rental_banner_button')}
            </button>
          </Link>
        </div>
      </Container>
      <div className={styles['rental__light-gray']}>
        <Container>
          <div className={styles['rental__heading']}>
            {t('service:rental_head')}
          </div>
          <div className={styles['speedhome-provide__step-container']}>
            <div className={styles['speedhome-provide__img-text-wrapper']}>
              <div className={styles['speedhome-provide__img-wrapper']}>
                <img
                  className={styles['speedhome-provide__img-style']}
                  src='/img/icons/apartment-blue-24px.svg'
                  alt=''
                />
              </div>
              <div className={styles['speedhome-provide__img-text']}>
                {t('service:rental_text1')}
              </div>
            </div>
            <div className={styles['speedhome-provide__img-text-wrapper']}>
              <div className={styles['speedhome-provide__img-wrapper']}>
                <img
                  className={styles['speedhome-provide__img-style']}
                  src='/img/icons/event_available-blue-24px.svg'
                  alt=''
                />
              </div>
              <div className={styles['speedhome-provide__img-text']}>
                {t('service:rental_text2')}
              </div>
            </div>
            <div className={styles['speedhome-provide__img-text-wrapper']}>
              <div className={styles['speedhome-provide__img-wrapper']}>
                <img
                  className={styles['speedhome-provide__img-style']}
                  src='/img/icons/thumb_up_alt-blue-24px.svg'
                  alt=''
                />
              </div>
              <div className={styles['speedhome-provide__img-text']}>
                {t('service:rental_text3')}
              </div>
            </div>
            <div className={styles['speedhome-provide__img-text-wrapper']}>
              <div className={styles['speedhome-provide__img-wrapper']}>
                <img
                  className={styles['speedhome-provide__img-style']}
                  src='/img/icons/assignment-blue-24px.svg'
                  alt=''
                />
              </div>
              <div className={styles['speedhome-provide__img-text']}>
                {t('service:rental_text4')}
              </div>
            </div>
            <div className={styles['speedhome-provide__img-text-wrapper']}>
              <div className={styles['speedhome-provide__img-wrapper']}>
                <img
                  className={styles['speedhome-provide__img-style']}
                  src='/img/icons/assignment-blue-24px.svg'
                  alt=''
                />
              </div>
              <div className={styles['speedhome-provide__img-text']}>
                {t('service:rental_text5')}
              </div>
            </div>
            <div className={styles['speedhome-provide__img-text-wrapper']}>
              <div className={styles['speedhome-provide__img-wrapper']}>
                <img
                  className={styles['speedhome-provide__img-style']}
                  src='/img/icons/sentiment_satisfied_alt-blue-24px.svg'
                  alt=''
                />
              </div>
              <div className={styles['speedhome-provide__img-text']}>
                {t('service:rental_text6')}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className={styles['speedhome-provide-blog__root']}>
          <div className={styles['speedhome-provide-blog__head']}>
            {t('service:rental_head2')}
          </div>
          <div className={styles['speedhome-provide-blog__text']}>
            {t('service:rental_head2_text')}
          </div>
          <div className={styles['speedhome-provide__img-root']}>
            <div>
              <div className={styles['speedhome-provide__direction']}>
                <div className={styles['speedhome-provide__img-wrapper']}>
                  <img
                    className={styles['speedhome-provide__img-style']}
                    src='/img/icons/person-24px.svg'
                    alt=''
                  />
                </div>
                <div>{t('service:rental_tenant')}</div>
              </div>
            </div>
            {windowMain && windowMain.innerWidth > 768 ? (
              <img
                className={styles['speedhome-direction-img']}
                src='/img/icons/Group-2389.svg'
              />
            ) : (
              <img
                className={styles['speedhome-direction-img']}
                src='/img/icons/Group-2433.svg'
              />
            )}
            <div>
              <div className={styles['speedhome-provide__direction']}>
                <div className={styles['speedhome-provide__img-wrapper']}>
                  <img
                    className={styles['speedhome-provide__img-style']}
                    src='/img/icons/Path-4554.svg'
                    alt=''
                  />
                </div>
                <div>{t('service:rental_speed')}</div>
              </div>
            </div>
            {windowMain && windowMain.innerWidth > 768 ? (
              <img
                className={styles['speedhome-direction-img']}
                src='/img/icons/Group-2389.svg'
              />
            ) : (
              <img
                className={styles['speedhome-direction-img']}
                src='/img/icons/Group-2433.svg'
              />
            )}
            <div>
              <div className={styles['speedhome-provide__direction']}>
                <div className={styles['speedhome-provide__img-wrapper']}>
                  <img
                    className={styles['speedhome-provide__img-style']}
                    src='/img/icons/person-24px.svg'
                    alt=''
                  />
                </div>
                <div>{t('service:rental_landlord')}</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className={styles['rental__light-gray']}>
        <Container>
          <div>
            <div className={styles['different-heading__container']}>
              <div className={styles['different__head']}>
                {t('service:rental_head3')}
              </div>
              <div className={styles['different-heading__text']}>
                {t('service:rental_head3_text')}
              </div>
            </div>
            <div className={styles['different-blog-img__container']}>
              <div className={styles['different-blog-img-text']}>
                <img
                  className={styles['we-are-different-img']}
                  src='/img/icons/headset_mic-blue-24px.svg'
                />
                <div className={styles['different-img-text-root']}>
                  <div className={styles['different-img-head']}>
                    {t('service:rental_subhead1')}
                  </div>
                  <div>{t('service:rental_subhead1_text')}</div>
                </div>
              </div>
              <div className={styles['different-blog-img-text']}>
                <img
                  className={styles['we-are-different-img']}
                  src='/img/icons/lock-blue-24px.svg'
                />
                <div className={styles['different-img-text-root']}>
                  <div className={styles['different-img-head']}>
                    {t('service:rental_subhead2')}
                  </div>
                  <div>{t('service:rental_subhead2_text')}</div>
                </div>
              </div>
              <div className={styles['different-blog-img-text']}>
                <img
                  className={styles['we-are-different-img']}
                  src='/img/icons/developer_board-blue-24px.svg'
                />
                <div className={styles['different-img-text-root']}>
                  <div className={styles['different-img-head']}>
                    {t('service:rental_subhead3')}
                  </div>
                  <div>{t('service:rental_subhead3_text')}</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className={styles['discover-container']}>
          <img
            className={styles['discover-img']}
            src='/img/discover-speedhome.jpg'
          />
          <div className={styles['discover-right_content']}>
            <div className={styles['discover-head']}>
              {t('service:rental_head4')}
            </div>
            <div className={styles['discover-text']}>
              {t('service:rental_head4_text')}
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
export default Rental
