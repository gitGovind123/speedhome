import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import Slider from 'react-slick'

const InsuranceStep = ({ styles }) => {
  const plansSettings = {
    dots: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  }
  const { t } = useTranslation('common')

  return (
    <>
      <div id='main' className='inner-pages overview'>
        <div
          className={`container with-pads ${styles['plans-block']} align-center`}
          style={{ paddingTop: '50px', paddingBottom: '40px' }}
        >
          <div className='row'>
            <Slider {...plansSettings} className={styles['plans-slider']}>
              <div>
                <div className={styles['plan-item']}>
                  <div className={styles['plan-item-title']}>
                    {t('more:text_more_landlord_overview_basic')}
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_rental_collection')}
                    </div>
                    <div className={styles['align-right']}>
                      <img src='/img/checked-ico.svg' alt='' />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_rental_guarantee')}
                    </div>
                    <div className={styles['align-right']}>
                      <img src='/img/cancel-ico.svg' alt='' />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>{t('more:text_more_landlord_overview_OCD')}</div>
                    <div className={styles['align-right']}>
                      <img src='/img/cancel-ico.svg' alt='' />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_eviction_support')}
                    </div>
                    <div className={styles['align-right']}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'more:text_more_landlord_overview_speedhome_manage',
                            { interpolation: { escapeValue: false } }
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_tenant_screening')}
                    </div>
                    <div className={styles['align-right']}>
                      <img
                        src='/img/tenant_screening.png'
                        alt=''
                        className={styles['screening']}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_loss_of_rental')}
                    </div>
                    <div className={styles['align-right']}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'more:text_more_landlord_overview_up_to_80',
                            {
                              interpolation: { escapeValue: false }
                            }
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t(
                        'more:text_more_landlord_overview_inconvenience_benefits'
                      )}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM1,000
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_accidental_damage')}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM15,000
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_total_coverage')}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM24,000
                    </div>
                  </div>
                  <div className={styles['plan-item-footer']}>
                    <div>{t('more:text_more_landlord_overview_cost')}</div>
                    <div className={styles['align-right']}>
                      1 {t('more:text_more_landlord_overview_month')} +<br />
                      6% SST + RM10
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className={`${styles['plan-item']} ${styles['extended']}`}>
                  <div className={styles['plan-item-title']}>
                    {t('more:text_more_landlord_overview_extended')}
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_rental_collection')}
                    </div>
                    <div className={styles['align-right']}>
                      <img src='/img/checked-ico.svg' alt='' />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_rental_guarantee')}
                    </div>
                    <div className={styles['align-right']}>
                      <img src='/img/cancel-ico.svg' alt='' />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>{t('more:text_more_landlord_overview_OCD')}</div>
                    <div className={styles['align-right']}>
                      <img src='/img/cancel-ico.svg' alt='' />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_eviction_support')}
                    </div>
                    <div className={styles['align-right']}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'more:text_more_landlord_overview_speedhome_manage',
                            { interpolation: { escapeValue: false } }
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_tenant_screening')}
                    </div>
                    <div className={styles['align-right']}>
                      <img
                        src='/img/tenant_screening.png'
                        alt=''
                        className={styles['screening']}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_loss_of_rental')}
                    </div>
                    <div className={styles['align-right']}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'more:text_more_landlord_overview_up_to_2_months',
                            { interpolation: { escapeValue: false } }
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t(
                        'more:text_more_landlord_overview_inconvenience_benefits'
                      )}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM2,000
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_accidental_damage')}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM30,000
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_total_coverage')}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM42,000
                    </div>
                  </div>
                  <div className={styles['plan-item-footer']}>
                    <div>{t('more:text_more_landlord_overview_cost')}</div>
                    <div className={styles['align-right']}>
                      1.25 {t('more:text_more_landlord_overview_months')} +
                      <br />
                      6% SST + RM10
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div
                  className={`${styles['plan-item']} ${styles['extended-plus']}`}
                >
                  <div
                    className={`${styles['plan-item-title']} ${styles['free-img-root']}`}
                  >
                    {t('more:text_more_landlord_overview_extended')} +
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_rental_collection')}
                    </div>
                    <div className={styles['align-right']}>
                      <img src='/img/checked-ico.svg' alt='' />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_rental_guarantee')}
                    </div>
                    <div className={styles['align-right']}>
                      <img src='/img/checked-ico.svg' alt='' />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>{t('more:text_more_landlord_overview_OCD')}</div>
                    <div className={styles['align-right']}>
                      <img src='/img/checked-ico.svg' alt='' />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_eviction_support')}
                    </div>
                    <div className={styles['align-right']}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'more:text_more_landlord_overview_speedhome_manage',
                            { interpolation: { escapeValue: false } }
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_tenant_screening')}
                    </div>
                    <div className={styles['align-right']}>
                      <img
                        src='/img/tenant_screening.png'
                        alt=''
                        className={styles['screening']}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_loss_of_rental')}
                    </div>
                    <div className={styles['align-right']}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: t(
                            'more:text_more_landlord_overview_up_to_2_months',
                            { interpolation: { escapeValue: false } }
                          )
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t(
                        'more:text_more_landlord_overview_inconvenience_benefits'
                      )}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM2,000
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_accidental_damage')}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM30,000
                    </div>
                  </div>
                  <div className={styles['item-row']}>
                    <div>
                      {t('more:text_more_landlord_overview_total_coverage')}
                    </div>
                    <div className={styles['align-right']}>
                      <span className={styles['fs10']}>
                        {t('more:text_more_landlord_overview_up_to')}
                      </span>
                      <br />
                      RM42,000
                    </div>
                  </div>
                  <div className={styles['plan-item-footer']}>
                    <div>{t('more:text_more_landlord_overview_cost')}</div>
                    <div className={styles['align-right']}>
                      1.5 {t('more:text_more_landlord_overview_months')} +
                      <br />
                      6% SST + RM10
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </>
  )
}

export default InsuranceStep
