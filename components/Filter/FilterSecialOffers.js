import React, { useState, useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close'

import Container from 'react-bootstrap/Container'
import useTranslation from 'next-translate/useTranslation'

import {
  getHotDeals,
  getHotPropertiesList,
  getActiveCampaign
} from '../../actions'

const FilterSpecialOffer = props => {
  const {
    openedPopupName,
    ptDeals,
    htDeals,
    closeMoreFilter,
    changePartnersDeal,
    changeHotDeal,
    clearMoreFilter,
    SpSearch,
    styles
  } = props

  const [activeCampaigns, setActiveCampaigns] = useState([])
  const [list, setList] = useState([])
  const [hotDeal, setHotDeal] = useState([])

  const { t } = useTranslation('common')

  useEffect(() => {
    async function fetchMyData () {
      const hotDeals = await getHotDeals()
      const propertyList = await getHotPropertiesList()
      const campaign = await getActiveCampaign()

      if (campaign.success) {
        setActiveCampaigns(campaign.data)
      }

      if (hotDeals.success) {
        setHotDeal(hotDeals.data)
      }

      if (propertyList.success) {
        setList(propertyList.data)
      }
    }

    fetchMyData()
  }, [])

  if (openedPopupName === 'special') {
    return (
      <div
        className={` ${styles['mfp-bg']} ${styles['filt']} ${styles['FilterMore_main']}`}
      >
        <div className={`${styles['white-popup']} ${styles['fullscreen']}`}>
          <div className={styles['page-main-title']}>
            <Container className={styles['container']}>
              <h1>{t('text_filter')}</h1>
              <a
                id='btn_closeFilter'
                className={`close ${styles['close']} ${styles['mfp-filter-close']}`}
                onClick={closeMoreFilter}
              >
                <CloseIcon />
              </a>
            </Container>
          </div>
          <div className={styles['filter-container']}>
            <Container>
              <div className={styles['inner']}>
                <div id='filterCarpark' className={styles['slot-filter']}>
                  <h2>{t('text_partners_deal')}</h2>

                  {activeCampaigns.length > 0 && (
                    <div
                      className={`${styles['filter-op']} ${styles['btn-group']} btn-group`}
                    >
                      {activeCampaigns.map((campaign, index) => {
                        return (
                          <a
                            id='btn_carparks_1'
                            className={`${
                              styles['btn']
                            } btn btn-curv btn-dark-gray ${
                              styles[' btn-dark-gray']
                            } ${ptDeals === index ? styles['active'] : ''}`}
                            onClick={() => changePartnersDeal(index, campaign)}
                          >
                            {campaign.campaignName}
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div id='filterCarpark' className={styles['slot-filter']}>
                  <h2>{t('text_hot_deal')}</h2>

                  {hotDeal.length > 0 && (
                    <div
                      className={`${styles['filter-op']} ${styles['btn-group']} btn-group`}
                    >
                      {hotDeal.map((deal, index) => {
                        return (
                          <div>
                          <a
                            id='btn_carparks_1'
                            className={`${
                              styles['btn']
                            } btn btn-curv btn-dark-gray ${
                              styles[' btn-dark-gray']
                            } ${htDeals === deal.id ? styles['active'] : ''}`}
                            onClick={() => changeHotDeal(index, deal)}
                          >
                            {deal.bannerDescription}
                          </a>
                          <a
                            id='btn_carparks_1'
                            className={`${
                              styles['btn']
                            } btn btn-curv btn-dark-gray ${
                              styles[' btn-dark-gray']
                            } `}
                            href='/rental-bidding?utm_source=search-filter'
                            target='_blank'
                          >
                              20% Cheaper All Year
                          </a>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`${styles['btn-holder']} ${styles['bottom-btns']} text-right`}
              >
                <div className='container'>
                  <a
                    id='btn_clear'
                    className={`btn btn-curv btn-dark-gray-filled ${styles['btn']} ${styles['btn-dark-gray-filled']}`}
                    onClick={clearMoreFilter}
                  >
                    {t('btn_clear')}
                  </a>
                  <a
                    id='btnFilterSubmit'
                    className={`btn btn-curv btn-secondary-filled ${styles['btn']} ${styles['btn-secondary-filled']}`}
                    onClick={SpSearch}
                  >
                    {t('btn_filter_now')}
                  </a>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default FilterSpecialOffer
