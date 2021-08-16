import React from 'react'
import Slider from '@material-ui/core/Slider'
import Form from 'react-bootstrap/Form'

import useTranslation from 'next-translate/useTranslation'

const FilterPriceSlider = props => {
  const {
    openedPopupName,
    url,
    rentSlider,
    rentSliderValueMin,
    rentSliderValueMax,
    buySlider,
    buySliderValueMin,
    buySliderValueMax,
    types,
    furnish,

    sliderOverrides,
    marks,
    changeRentSliderValue,
    changeRentSliderValueMin,
    changeRentSliderValueMax,
    buyMarks,
    changeBuySliderValue,
    changeBuySliderValueMin,
    changeBuySliderValueMax,
    clearPrice,
    search,
    changeType,
    clearTypes,
    changeFurnish,
    clearFurnish,
    styles
  } = props
  const { t } = useTranslation('common')

  return (
    <div className='container'>
      <div
        className={
          openedPopupName === 'price'
            ? `'price-popup ${styles['price-popup']} opened ${styles['opened']}`
            : `${styles['price-popup']} price-popup`
        }
      >
        {url === 'rent' ? (
          <React.Fragment>
            <Slider
              classes={sliderOverrides}
              value={rentSlider.currentValue}
              min={rentSlider.min}
              max={rentSlider.max}
              step={rentSlider.step}
              marks={marks}
              onChange={changeRentSliderValue}
            />
            <div className={styles['price_filter_input']}>
              <Form.Control
                className={styles['form-control']}
                type='text'
                value={rentSliderValueMin}
                onChange={changeRentSliderValueMin}
              />{' '}
              -{' '}
              <Form.Control
                className={styles['form-control']}
                type='text'
                value={rentSliderValueMax}
                onChange={changeRentSliderValueMax}
              />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Slider
              classes={sliderOverrides}
              value={buySlider.currentValue}
              min={buySlider.min}
              max={buySlider.max}
              step={buySlider.step}
              marks={buyMarks}
              onChange={changeBuySliderValue}
            />
            <div className={styles['price_filter_input']}>
              <Form.Control
                className={styles['form-control']}
                type='text'
                value={buySliderValueMin}
                onChange={changeBuySliderValueMin}
              />{' '}
              -{' '}
              <Form.Control
                className={styles['form-control']}
                type='text'
                value={buySliderValueMax}
                onChange={changeBuySliderValueMax}
              />
            </div>
          </React.Fragment>
        )}
        <div className={`${styles['btn-holder']} text-right ${styles['btns']}`}>
          <div className={styles['filter-box-container']}>
            <a
              id='btn_clear'
              className={`btn btn-curv btn-dark-gray-filled ${styles['btn']} ${styles['btn-dark-gray-filled']}`}
              onClick={clearPrice}
            >
              {t('btn_clear')}
            </a>
            <a
              id='btn_filter_now'
              className={`${styles['btnFilterSubmit']} btn ${styles['btn']} btn-secondary-filled  ${styles['btn-dark-gray-filled']}`}
              onClick={search}
            >
              {t('btn_filter_now')}
            </a>
          </div>
        </div>
      </div>

      <div
        className={
          openedPopupName === 'type'
            ? `${styles['type-popup']} ${styles['opened']}`
            : styles['type-popup']
        }
      >
        <div id='filterType'>
          <div className={`${styles['filter-op']} ${styles['btn-group']}`}>
            {url === 'rent' ? (
              <React.Fragment>
                <a
                  id='btn_landed'
                  className={`${styles['rentType']} btn ${styles['btn']} ${
                    styles['btn-curv']
                  } btn-dark-gray ${styles['filter-type']} ${
                    types.indexOf('house') !== -1 ||
                    types.indexOf('terrace') !== -1
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => changeType('house')}
                >
                  {t('btn_landed')}
                </a>
                <a
                  id='btn_highrise'
                  className={`${styles['rentType']} btn ${styles['btn']} ${
                    styles['btn-curv']
                  } btn-dark-gray ${styles['filter-type']} ${
                    types.indexOf('highrise') !== -1 ||
                    types.indexOf('studio') !== -1 ||
                    types.indexOf('apartment') !== -1 ||
                    types.indexOf('condo') !== -1
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => changeType('highrise')}
                >
                  {t('btn_highrise')}
                </a>
                <a
                  id='btn_room'
                  className={`${styles['rentType']} btn ${styles['btn']} ${
                    styles['btn-curv']
                  } btn-dark-gray ${styles['filter-type']} ${
                    types.indexOf('room') !== -1 ? 'active' : ''
                  }`}
                  onClick={() => changeType('room')}
                >
                  {t('btn_room')}
                </a>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <a
                  id='btn_landed'
                  className={`${styles['buyType']} btn ${
                    styles['btn-curv']
                  } btn-dark-gray ${styles['filter-type']} ${
                    types.indexOf('house_sale') !== -1 ? 'active' : ''
                  }`}
                  onClick={() => changeType('house_sale')}
                >
                  {t('btn_landed')}
                </a>
                <a
                  id='btn_highrise'
                  className={`${styles['buyType']} btn ${
                    styles['btn-curv']
                  } btn-dark-gray ${styles['filter-type']} ${
                    types.indexOf('highrise_sale') !== -1 ? 'active' : ''
                  }`}
                  onClick={() => changeType('highrise_sale')}
                >
                  {t('btn_highrise')}
                </a>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className={`${styles['btn-holder']} text-right ${styles['btns']}`}>
          <div className={styles['filter-box-container']}>
            <a
              id='btn_clear'
              className={`btn btn-curv ${styles['btn']} btn-dark-gray-filled ${styles['btn-dark-gray-filled']}`}
              onClick={clearTypes}
            >
              {t('btn_clear')}
            </a>
            <a
              id='btn_filter_now'
              className={`btn btn-curv ${styles['btn']} ${styles['btnFilterSubmit']} btn-secondary-filled ${styles['btn-dark-gray-filled']}`}
              onClick={search}
            >
              {t('btn_filter_now')}
            </a>
          </div>
        </div>
      </div>

      <div
        className={
          openedPopupName === 'furnish'
            ? `${styles['furnish-popup']} ${styles['opened']}`
            : styles['furnish-popup']
        }
      >
        <div id='filterType'>
          <div
            className={`${styles['filter-op']} btn-group ${styles['btn-group']}`}
          >
            <a
              id='btn_no_furnishing'
              className={`${styles['buyType']} btn ${styles['btn']} ${
                styles['btn-curv']
              } btn-dark-gray ${styles['filter-type']} ${
                furnish === 0 ? 'active' : ''
              }`}
              onClick={() => changeFurnish(0)}
            >
              {t('btn_no_furnishing')}
            </a>
            <a
              id='btn_partial_furnishing'
              className={`${styles['buyType']} btn ${styles['btn']} ${
                styles['btn-curv']
              } btn-dark-gray ${styles['filter-type']} ${
                furnish === 1 ? 'active' : ''
              }`}
              onClick={() => changeFurnish(1)}
            >
              {t('btn_partial_furnishing')}
            </a>
            <a
              id='btn_fully_furnishing'
              className={`${styles['buyType']} btn ${styles['btn']} ${
                styles['btn-curv']
              } btn-dark-gray ${styles['filter-type']} ${
                furnish === 2 ? 'active' : ''
              }`}
              onClick={() => changeFurnish(2)}
            >
              {t('btn_fully_furnishing')}
            </a>
          </div>
        </div>
        <div className={`${styles['btn-holder']} text-right ${styles['btns']}`}>
          <div className={styles['filter-box-container']}>
            <a
              id='btn_clear'
              className={`btn btn-curv btn-dark-gray-filled ${styles['btn']} ${styles['btn-dark-gray-filled']}`}
              onClick={clearFurnish}
            >
              {t('btn_clear')}
            </a>
            <a
              id='btn_filter_now'
              className={`${styles['btnFilterSubmit']} btn ${styles['btn']} btn-curv btn-secondary-filled ${styles['btn-dark-gray-filled']}`}
              onClick={search}
            >
              {t('btn_filter_now')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterPriceSlider
