import React from 'react'
import { withRouter } from 'next/router'
import Select from 'react-select'
import useTranslation from 'next-translate/useTranslation'

//icons
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import MapIcon from '@material-ui/icons/Map'
import SortIcon from '@material-ui/icons/SwapVert'
import GridViewIcon from '@material-ui/icons/ViewList'
import FilterAutoCompleteList from './FilterAutoCompleteList'
import styles from './index.module.scss'

const FilterInputBox = props => {
  const {
    furnish,
    typesNames,
    prices,
    page,
    url,
    searchQuery,
    sortedAutocompleteList,
    openedPopupName,
    leaseType,
    rooms,
    roomType,
    bathrooms,
    bathroomType,
    ptDeals,
    htDeals,
    names,
    clearMoreFilter,
    clearSpFilter,
    cars,
    lrt,
    petFriendly,
    allRaces,
    instantView,
    map,
    showSortPopup,
    showSortPopupMethod,
    changeUrlFromSelect,
    changeSearchQuery,

    search,
    setAutocompleteItem,
    openPopup,
    changeSort,
    changeToMap,
    handleKeyDown,
    cursor,
    presetFilterStatus,
    clearPresetFilter
  } = props
  const { t } = useTranslation('common')

  const UrlSelectData = [
    { value: 0, label: t('text_rent') },
    { value: 1, label: t('text_buy') }
  ]

  let isMapView = false

  if (props.router && props.router.query) {
    isMapView = Number(props.router.query.map) !== -1
  }

  return (
    <div className={page !== '' ? styles['flex-container'] : null}>
      <div className={page !== '' ? styles['filter-leftside'] : null}>
        <div
          id='search-form'
          className={`${styles['visual-tab']} ${styles['tab-wrapper']}`}
        >
          <div className={styles['visual-search']}>
            {page !== '' ? (
              <div className={styles['filter-select']}>
                <div className={styles['custom-select-wrapper']}>
                  <Select
                    options={UrlSelectData}
                    defaultValue={
                      url === 'rent' ? UrlSelectData[0] : UrlSelectData[1]
                    }
                    styles={selectStyles}
                    classNamePrefix='react-select'
                    onChange={e => changeUrlFromSelect(e)}
                    isSearchable={false}
                  />
                </div>
              </div>
            ) : null}
            <label
              htmlFor='type_in_area'
              style={{
                position: 'fixed',
                top: '-9999999px'
              }}
            >
              Type in area
            </label>
            <input
              id='type_in_area'
              className={`${styles['form-control']} ${styles['ui-autocomplete-input']} `}
              placeholder={t('text_type_in_area')}
              value={searchQuery.replace(/[-]/g, ' ')}
              onChange={e => changeSearchQuery(e)}
              onKeyDown={handleKeyDown}
            />

            <span title='Clear' className={styles['clear']}>
              ×
            </span>
            <div
              className={`${styles['filter-rightside']}`}
              style={{ display: 'none' }}
            >
              <div className={`${styles['resultsView map']}`}>
                <MapIcon />
              </div>
            </div>
            <button
              id='searchButton'
              name='search'
              type='button'
              onClick={() => search()}
            >
              <SearchIcon />
            </button>

            <FilterAutoCompleteList
              sortedAutocompleteList={sortedAutocompleteList}
              setAutocompleteItem={setAutocompleteItem}
              cursor={cursor}
            />
          </div>
        </div>

        <div className={`${styles['input-box']}`}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'baseline'
            }}
          >
            {presetFilterStatus ? (
              <div>
                <label className={`${styles['switch']}`}>
                  <input onClick={clearPresetFilter} type='checkbox' />
                  <span
                    className={`${styles['slider']} ${styles['round']}`}
                  ></span>
                </label>
                <span
                  style={{
                    marginLeft: '14px',
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  {t('btn_custom_filter')}
                </span>
              </div>
            ) : null}
            <div style={{ display: 'flex' }}>
              <a
                id='btn_price'
                className={`${styles['btn-primary-filled']} ${styles['btn']} ${
                  styles['btn-filter']
                } ${styles['btn-curv']} ${styles['filter-icon__size']} ${
                  openedPopupName === 'price' || prices.length > 0
                    ? styles['active']
                    : ''
                } ${isMapView ? styles['mapViewFilterBtn'] : ''}`}
                onClick={() => openPopup('price')}
              >
                {prices.length > 0
                  ? `RM ${prices[0]} - RM ${prices[1]}`
                  : t('btn_price')}
              </a>

              <a
                id='btn_type'
                className={`${styles['btn-primary-filled']} ${styles['btn']} ${
                  styles['btn-filter']
                } ${styles['btn-curv']} ${styles['filter-icon__size']} ${
                  openedPopupName === 'type' || typesNames.length > 0
                    ? styles['active']
                    : ''
                } ${isMapView ? styles['mapViewFilterBtn'] : ''}`}
                onClick={() => openPopup('type')}
              >
                {typesNames.length > 0 ? typesNames.join(', ') : t('btn_type')}
              </a>

              <a
                id=' btn_furnish'
                className={`${styles['btn-primary-filled']} ${styles['btn']} ${
                  styles['btn-filter']
                } ${styles['btn-curv']} ${styles['filter-icon__size']} ${
                  openedPopupName === 'furnish' || furnish !== -1
                    ? styles['active']
                    : ''
                } ${isMapView ? styles['mapViewFilterBtn'] : ''}`}
                onClick={() => openPopup('furnish')}
              >
                {furnish !== -1 ? furnish : t('btn_furnish')}
              </a>

              <a
                id='btn_more_filter'
                className={`${styles['btn-primary-filled']} ${styles['btn']} ${
                  styles['btn-filter']
                } ${styles['btn-curv']} ${styles['filter-icon__size']} ${
                  openedPopupName === 'more' ||
                  leaseType !== '' ||
                  rooms !== -1 ||
                  roomType !== -1 ||
                  bathrooms !== -1 ||
                  bathroomType !== -1 ||
                  cars !== -1 ||
                  lrt !== -1 ||
                  petFriendly !== -1 ||
                  allRaces !== -1 ||
                  instantView !== -1
                    ? styles['active']
                    : ''
                } ${isMapView ? styles['mapViewFilterBtn'] : ''}`}
                onClick={() => openPopup('more')}
              >
                {t('btn_more_filter')}
              </a>
              <a
                id='btn_special-offers'
                className={`${styles['btn-primary-filled']} ${styles['btn']} ${
                  styles['btn-filter']
                } ${styles['btn-curv']} ${styles['filter-special-offer']} ${
                  styles['filter-icon__size']
                } ${
                  openedPopupName === 'special' ||
                  ptDeals !== -1 ||
                  htDeals !== -1
                    ? styles['active']
                    : ''
                } ${isMapView ? styles['mapViewFilterBtn'] : ''}`}
                onClick={() => openPopup('special')}
              >
                {t('btn_special-offers')}
              </a>

              {ptDeals !== -1 || htDeals !== -1 || names !== '' ? (
                <div
                  className={`${styles['btn-primary-filled']} ${
                    styles['btn']
                  } ${styles['btn-filter']} ${styles['filter-special-offer']} ${
                    styles['btn-curv']
                  } ${styles['filter-icon__size']} ${
                    openedPopupName === 'special' ||
                    ptDeals !== -1 ||
                    htDeals !== -1
                      ? styles['active']
                      : ''
                  }`}
                >
                  <a
                    id='btn_special-offers'
                    onClick={() => openPopup('special')}
                  >
                    {names}
                  </a>
                  <a id='btn_clear' onClick={clearSpFilter}>
                    <CloseIcon
                      style={{
                        paddingLeft: '5px'
                      }}
                    />
                  </a>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div
            style={{ marginTop: presetFilterStatus ? '-30px' : '0px' }}
            className={`${styles['mapsort']}`}
          >
            {page !== '' ? (
              <div
                id='map-sort-root'
                className={`${styles['filter-rightside']} ${styles['map-sort__container']}`}
              >
                {Number(map) === -1 ? (
                  <div
                    id='sort_id'
                    className={`${styles['filter-sort-btn']} ${styles['sort__icon-text']}`}
                    onClick={() => showSortPopupMethod()}
                  >
                    <SortIcon />
                    <div className={`${styles['sort__text']}`}>
                      {t('text_filter_sort')}
                    </div>
                  </div>
                ) : null}

                <div>
                  {Number(map) === -1 ? (
                    <div
                      id='mapview_id'
                      className={`${styles['map__icon-text']}`}
                      onClick={() => changeToMap()}
                    >
                      <MapIcon root={{}} />
                      <div className={`${styles['map__text']}`}>
                        {t('text_map_view')}
                      </div>
                    </div>
                  ) : (
                    <div
                      id='gridview_id'
                      className={`${styles['grid-view__container']}`}
                      onClick={() => changeToMap()}
                    >
                      <GridViewIcon />
                      <div className={`${styles['grid-view__text']}`}>
                        {t('text_grid_view')}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={`${showSortPopup ? styles['opened'] : ''} ${
                    styles['sort-popup']
                  }`}
                >
                  <div
                    id='sort-relevance'
                    onClick={() => changeSort('relevance')}
                  >
                    {t('text_filter_relevance')}
                  </div>
                  <div
                    id='sort-distance'
                    onClick={() => changeSort('distance')}
                  >
                    {t('text_filter_distance')}
                  </div>
                  <div id='sort-price' onClick={() => changeSort('price')}>
                    {t('text_filter_price')}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className={`${styles['special-offer']}`}>
        <div className={`${styles['input-box']}`}>
          <div style={{ display: 'flex' }}>
            <a
              id='btn_special-offers'
              className={`${styles['btn-primary-filled']} ${styles['btn']} ${
                styles['btn-filter']
              } ${styles['btn-curv']}  ${styles['filter-icon__size']} ${
                openedPopupName === 'special' ||
                ptDeals !== -1 ||
                htDeals !== -1
                  ? styles['active']
                  : ''
              }`}
              onClick={() => openPopup('special')}
            >
              {t('btn_special-offers')}
            </a>
            {ptDeals !== -1 || htDeals !== -1 || names !== '' ? (
              <div
                className={`${styles['btn-primary-filled']} ${styles['btn']} ${
                  styles['btn-filter']
                } ${styles['btn-curv']} ${styles['filter-icon__size']} 
             ${
               openedPopupName === 'special' || ptDeals !== -1 || htDeals !== -1
                 ? styles['active']
                 : ''
             }`}
              >
                <a id='btn_special-offers' onClick={() => openPopup('special')}>
                  {names}
                </a>
                <a id='btn_clear' onClick={clearSpFilter}>
                  <CloseIcon
                    style={{
                      paddingLeft: '5px'
                    }}
                  />
                </a>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const selectStyles = {
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0deg)'
  }),

  indicatorSeparator: provided => ({
    ...provided,
    display: 'none'
  }),

  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? 'rgb(249, 249, 249)' : 'rgb(255, 255, 255)'
  })
}

export default withRouter(FilterInputBox)
