import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import Head from '../../../components/Common/Head'
import { Container } from 'react-bootstrap'
import styles from './homerunner.module.scss'

const Index = () => {
  const { t } = useTranslation('common')
  return (
    <div>
      <Head title='Viewing Management for Landlords'></Head>
      <div className={styles['homerunner-banner-img']}>
        <div className={styles['homerunnerbanner__text--container']}>
          <h1 className={styles['homerunnerbanner__text--header']}>
            {t('service:homerunner_banner_header')}
          </h1>
          <p className={styles['homerunnerbanner__text--style']}>
            {t('service:homerunner_banner_text')}
          </p>
          {/* <button className='btn yellow-btn'>
            {t('service:homerunner_banner_button')}
          </button> */}
        </div>
      </div>
      {/* <Container className='homerunner-container'> */}
      <Container>
        <div className={styles['homerunnerbanner__text--container-desktop']}>
          <h1 className={styles['homerunnerbanner__text--header-desktop']}>
            {t('service:homerunner_mobile_text')}
          </h1>
          <p className={styles['homerunnerbanner__text--style']}>
            {t('service:homerunner_banner_text')}
          </p>
          {/* <button className='btn yellow-btn'>
            {t('service:homerunner_banner_button')}
          </button> */}
        </div>
      </Container>

      <div className={styles['homerunner__light-gray']}>
        <Container className={styles['homerunner-container']}>
          <div className={styles['homerunner__heading-container']}>
            <h1 className={styles['homerunner__heading--bold']}>
              {t('service:homerunner_text1')}
            </h1>
            <p className={styles['homerunner__heading--text']}>
              {t('service:homerunner_text2')}
            </p>
          </div>
        </Container>

        <Container className={styles['homerunner-container']}>
          <div className={styles['homerunner-help__container']}>
            <div className={styles['homerunner-help__first-content']}>
              <img
                style={{ width: '30px' }}
                src='/img/icons/people_alt-blue-24px.svg'
              />
              <div className={styles['homerunner-img-text']}>
                <div className={styles['homerunner-help__heading']}>
                  {t('service:homerunner_help_head1')}
                </div>
                <div className={styles['homerunner-help__text']}>
                  {t('service:homerunner_help_text_head1')}
                </div>
              </div>
            </div>
            <div className={styles['homerunner-help__first-content']}>
              <img
                style={{ width: '30px' }}
                src='/img/icons/visibility-blue-24px.svg'
              />
              <div className={styles['homerunner-img-text']}>
                <div className={styles['homerunner-help__heading']}>
                  {t('service:homerunner_help_head2')}
                </div>
                <div className={styles['homerunner-help__text']}>
                  {t('service:homerunner_help_text_head2')}
                </div>
              </div>
            </div>
            <div className={styles['homerunner-help__first-content']}>
              <img
                style={{ width: '30px' }}
                src='/img/icons/home_work-blue-24px.svg'
              />
              <div className={styles['homerunner-img-text']}>
                <div className={styles['homerunner-help__heading']}>
                  {t('service:homerunner_help_head3')}
                </div>
                <div className={styles['homerunner-help__text']}>
                  {t('service:homerunner_help_text_head3')}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className={styles['homerunner-container']}>
        <div className={styles['free-homerunner__container']}>
          <div className={styles['free-homerunner__left-content']}>
            <div>{t('service:free_homerunner_left_text')}</div>
          </div>
          <div className={styles['free-homerunner__right-content']}>
            <div className={styles['right-content__step-root']}>
              <div className={styles['right-content__step']}>
                {t('service:free_homerunner_step1')}
              </div>
              <div className={styles['right-content__text']}>
                {t('service:free_homerunner_step1_text')}
              </div>
            </div>
            <div className={styles['right-content__step-root']}>
              <div className={styles['right-content__step']}>
                {t('service:free_homerunner_step2')}
              </div>
              <div className={styles['right-content__text']}>
                {t('service:free_homerunner_step2_text')}
              </div>
            </div>
            <div className={styles['right-content__step-root']}>
              <div className={styles['right-content__step']}>
                {t('service:free_homerunner_step3')}
              </div>
              <div className={styles['right-content__text']}>
                {t('service:free_homerunner_step3_text')}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className={styles['homerunner-hassle-free__root']}>
        <Container className={styles['homerunner-container']}>
          <div className={styles['hassle-free__container']}>
            <div className={styles['hassle-free__left-content']}>
              <div>{t('service:hassle_free_left_text')}</div>
            </div>
            <div className={styles['hassle-free__right-content']}>
              <div className={styles['hassle-free_right-content--one']}>
                {t('service:hassle_free_right_text_first')}
              </div>
              <div className={styles['hassle-free_right-content--two']}>
                {t('service:hassle_free_right_text_second')}
              </div>
              <div className={styles['hassle-free_right-content--three']}>
                {t('service:hassle_free_right_text_third')}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className={styles['homerunner-container']}>
        <div className={styles['terms-and-condition__container']}>
          <div className={styles['terms-and-condition__left-content']}>
            <div>{t('service:homerunner_terms_condition')}</div>
          </div>
          <div className={styles['terms-and-condition__right-content']}>
            <div className={styles['terms-and-condition__right-cnt-root']}>
              <div className={styles['terms-and-condition__right-cnt--head']}>
                1
              </div>
              <div className={styles['terms-and-condition__right-cnt--text']}>
                {t('service:homerunner_terms_condition_right_first_text')}
              </div>
            </div>
            <div className={styles['terms-and-condition__right-cnt-root']}>
              <div className={styles['terms-and-condition__right-cnt--head']}>
                2
              </div>
              <div className={styles['terms-and-condition__right-cnt--text']}>
                {t('service:homerunner_terms_condition_right_second_text')}
              </div>
            </div>
            <div className={styles['terms-and-condition__right-cnt-root']}>
              <div className={styles['terms-and-condition__right-cnt--head']}>
                3
              </div>
              <div className={styles['terms-and-condition__right-cnt--text']}>
                {t('service:homerunner_terms_condition_right_third_text')}
              </div>
            </div>
            <div className={styles['terms-and-condition__right-cnt-root']}>
              <div className={styles['terms-and-condition__right-cnt--head']}>
                4
              </div>
              <div className={styles['terms-and-condition__right-cnt--text']}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: t(
                      'service:homerunner_terms_condition_right_four_text',
                      {
                        interpolation: { escapeValue: false }
                      }
                    )
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
export async function getServerSideProps () {
  return {}
}

export default Index
