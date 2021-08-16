import React, { useEffect, useState } from 'react'
import { Container, Carousel } from 'react-bootstrap'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import Head from '../../../components/Common/Head'
import Link from 'next/link'

import styles from './ocd.module.scss'

const OTR_OCD = () => {
  const [windowMain, setWindowMain] = useState(null)
  const { t } = useTranslation('common')
  useEffect(() => {
    if (window) {
      setWindowMain(window)
    }
  }, [])
  return (
    <>
      <Head title={t('service:ocd_banner_header')} />
      <div className={styles['ocdbanner']}>
        <div
          className={`${styles['ocdbanner__text--container']} ${styles['ocdbanner_text-container']}`}
        >
          <h1 className={styles['ocdbanner__text--header']}>
            {t('service:ocd_banner_header')}
          </h1>
          <Link href={'/post'}>
            <button
              className={`btn yellow-btn  ${styles['zerobanner__upper-button']}`}
            >
              {t('service:rental_banner_button')}
            </button>
          </Link>
        </div>
      </div>

      <div className={`text-center py-2 px-2 ${styles['ocd-lg-hide']}`}>
        <h1
          className={styles['ocdbanner__text--header']}
          style={{ fontSize: '24px' }}
        >
          {t('service:ocd_banner_header')}
        </h1>
        <Link href={'/post'}>
          <button
            className={`btn mt-2 yellow-btn  ${styles['zerobanner__upper-button']}`}
          >
            {t('service:rental_banner_button')}
          </button>
        </Link>
      </div>

      <Container>
        <div className={styles['discover-container']}>
          <img
            className={styles['discover-img']}
            src='/img/ocd-speedhome.jpg'
          />
          <div className={styles['discover-right_content']}>
            <div className={styles['discover-head']}>
              {t('service:odc1_head4')}
            </div>
            <div className={styles['discover-text']}>
              {t('service:odc2_text')}
            </div>
          </div>
        </div>
      </Container>
      <div className={styles['rental__light-gray']}>
        <Container>
          <div>
            <div
              className={`${styles['different-heading']} ${styles['different-heading__container']}`}
            >
              <div
                className={`${styles['different__head']} ${styles['different_head']}`}
              >
                {t('service:ocd_head2_1')}
              </div>

              <div>
                <div
                  className={`${styles['discover-left']} ${styles['discover-right_content']}`}
                >
                  <div
                    className={`${styles['discover-head']} ${styles['discover-head_right']}`}
                  >
                    {t('service:otr_text_header')}
                  </div>
                  <div className={styles['discover-text']}>
                    {t('service:otr_text_body')}
                  </div>
                </div>
                <div
                  className={`${styles['discover-right']} ${styles['discover-right_content']}`}
                >
                  <div className={styles['discover-head']}>
                    {t('service:ocd_text_header')}
                  </div>
                  <div className={styles['discover-text']}>
                    {t('service:ocd_text_body')}
                  </div>
                </div>
              </div>
              <div className={styles['different-heading_all']}>
                <div className={styles['different-heading__text']}>
                  {t('service:ocd_head2_text_1')}
                </div>
                <div className={styles['different-heading__text']}>
                  {t('service:ocd_head2_text_1_a')}
                </div>
                <div className={styles['different-heading__text']}>
                  {t('service:ocd_head2_text_1_b')}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div
          className={`${styles['speedhome-provide-blog__root']} ${styles['speedhome-provide-blog']}`}
        >
          <div className={styles['speedhome-provide-blog__head']}>
            {t('service:ocd_head')}
          </div>
          <div className={styles['speedhome-provide__img-root']}>
            <div>
              <div className={styles['speedhome-provide__direction']}>
                <div className={styles['speedhome-provide__img-wrapper']}>
                  <img
                    className={styles['speedhome-provide__img-style']}
                    src='/img/icons/transfer-money-blue-24px.svg'
                    alt=''
                  />
                  <div className={styles['img_speedhome-direction']}>
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
                  </div>
                </div>
                <div
                  className={`${styles['speedhome-provide_text']} text-center py-2 px-2`}
                >
                  {t('service:ocd_head_sub_text1')}
                </div>
              </div>
            </div>
            <div className={styles['image_speedhome-direction']}>
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
            </div>
            <div>
              <div className={styles['speedhome-provide__direction']}>
                <div className={styles['speedhome-provide__img-wrapper']}>
                  <img
                    className={styles['speedhome-provide__img-style']}
                    src='/img/icons/card-blue-24px.svg'
                    alt=''
                  />
                  <div className={styles['img_speedhome-direction']}>
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
                  </div>
                </div>
                <div
                  className={`${styles['speedhome-provide_text']} text-center py-2 px-2`}
                >
                  {t('service:ocd_head_sub_text2')}
                </div>
              </div>
            </div>
            <div className={styles['image_speedhome-direction']}>
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
            </div>
            <div>
              <div className={styles['speedhome-provide__direction']}>
                <div className={styles['speedhome-provide__img-wrapper']}>
                  <img
                    className={styles['speedhome-provide__img-style']}
                    src='/img/icons/otr-transfer-blue-24px.svg'
                    alt=''
                  />
                </div>
                <div
                  className={`${styles['speedhome-provide_text']} text-center py-2 px-2`}
                >
                  {t('service:ocd_head_sub_text3')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className={styles['rental__light-gray']}>
        <Container>
          <div className={`${styles['rental__heading']} text-center py-2 px-2`}>
            {t('service:ocd_head_new')}
          </div>
          <div className={styles['speedhome-provide__step-container']}>
            <div className={styles['speedhome-provide__img-text-wrapper']}>
              <div
                className={`${styles['speedhome-provide__img-wrapper']} ${styles['speedhome-provide_image-wrapper']}`}
              >
                <img
                  className={styles['speedhome-provide__img-style']}
                  src='/img/icons/doller-blue-24px.svg'
                  alt=''
                />
              </div>
              <div className={styles['speedhome-provide__img-text']}>
                <div className={styles['ocd-head_1']}>
                  {t('service:ocd_head_sub_text1_1')}
                </div>
                {t('service:ocd_head_sub_text1_1_1')}
              </div>
            </div>
            <div className={styles['speedhome-provide__img-text-wrapper']}>
              <div
                className={`${styles['speedhome-provide__img-wrapper']} ${styles['speedhome-provide_image-wrapper']}`}
              >
                <img
                  className={styles['speedhome-provide__img-style']}
                  src='/img/icons/legal-cost-blue-24px.svg'
                  alt=''
                />
              </div>
              <div className={styles['speedhome-provide__img-text']}>
                <div className={styles['ocd-head_1']}>
                  {t('service:ocd_head_sub_text1_2')}
                </div>
                {t('service:ocd_head_sub_text1_2_2')}
              </div>
            </div>
            <div className={styles['speedhome-provide__img-text-wrapper']}>
              <div
                className={`${styles['speedhome-provide__img-wrapper']} ${styles['speedhome-provide_image-wrapper']}`}
              >
                <img
                  className={styles['speedhome-provide__img-style']}
                  src='/img/icons/secure-blue-24px.svg'
                  alt=''
                />
              </div>
              <div className={styles['speedhome-provide__img-text']}>
                <div className={styles['ocd-head_1']}>
                  {t('service:ocd_head_sub_text1_3')}
                </div>
                {t('service:ocd_head_sub_text1_3_3')}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div>
          <div
            className={`${styles['different-heading__container']} text-center py-2 px-2`}
          >
            <div className={styles['different__head']}>
              {t('service:ocd_head3_1')}
            </div>
            <div className={styles['different-heading__text']}>
              {t('service:ocd_head3_text1')}
              <b>{t('service:ocd_head3_text2')}</b>
              {t('service:ocd_head3_text3')}
            </div>
          </div>

          <div
            className={`${styles['wardrove__cards']} ${styles['ocdbanner__text--container ']}`}
          >
            <div className={styles['wardrove__cards--container']}>
              <img
                className={`${styles['speedhome-provide__img-style']} ${styles['provide__img-style']}`}
                src='/img/OCD -Basic.png'
                alt=''
              />
            </div>
            <div className={styles['wardrove__cards--container']}>
              <img
                className={`${styles['speedhome-provide__img-style']} ${styles['provide__img-style']}`}
                src='/img/OCD - Extended.png'
                alt=''
              />
            </div>
            <div className={styles['wardrove__cards--container']}>
              <img
                className={`${styles['speedhome-provide__img-style']} ${styles['provide__img-style']}`}
                src='/img/OCD - Extended Plus.png'
                alt=''
              />
            </div>
          </div>
          <Carousel
            className={`${styles['ocd-lg-hide']} ${styles['ocd_image_view_mobile']}`}
          >
            <Carousel.Item>
              <img src='/img/OCD -Basic.png' alt='' />
            </Carousel.Item>
            <Carousel.Item>
              <img src='/img/OCD - Extended.png' alt='' />
            </Carousel.Item>
            <Carousel.Item>
              <img src='/img/OCD - Extended Plus.png' alt='' />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className={styles['differnet-headingtext-all']}>
          <div className={styles['different-heading__text']}>
            {t('service:ocd_head3_text_1')}
          </div>
          <div className={styles['different-heading__text']}>
            {t('service:ocd_head3_text_2')}
          </div>
        </div>
      </Container>
      <div class={styles['rental__light-gray']}>
        <Container>
          <div className={styles['ocd-container']}>
            <div className={styles['ocd-head3']}>{t('service:ocd_head3')}</div>
            <div className={styles['ocd-right_content']}>
              <div className={styles['ocd-head']}>{t('service:ocd_head4')}</div>
              <div className={styles['ocd-text']}>
                {t('service:ocd_head4_text')}
              </div>
              <div className={styles['ocd-btn-container']}>
                <div className={styles['ocd-head']}>
                  {t('service:ocd_head4_1')}
                </div>
                <div className={styles['ocd-text']}>
                  {t('service:ocd_head4_1_text')}
                </div>
                <div className={styles['ocd-head']}>
                  {t('service:ocd_head4_2')}
                </div>
                <div className={styles['ocd-text']}>
                  {t('service:ocd_head4_2_text')}
                </div>
                <div className={styles['ocd-text']}>
                  {t('service:ocd_head4_2_text_ex')}
                </div>
                <div className={styles['ocd-head']}>
                  {t('service:ocd_head4_3')}
                </div>
                <div className={styles['ocd-text']}>
                  {t('service:ocd_head4_3_text')}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export async function getServerSideProps () {
  return {}
}

export default connect(state => ({ state }), null)(OTR_OCD)
