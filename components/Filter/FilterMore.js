import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import Container from 'react-bootstrap/Container'
import useTranslation from 'next-translate/useTranslation'

const FilterMore = props => {
  const {
    openedPopupName,
    url,
    leaseType,
    types,
    roomType,
    rooms,
    bathroomType,
    bathrooms,
    cars,
    petFriendly,
    allRaces,
    instantView,
    lrt,

    closeMoreFilter,
    changeLeaseType,
    changeRoomType,
    changeRooms,
    changeBathroomType,
    changeBathrooms,
    changeCars,
    changePetFriendly,
    changeAllRaces,
    changeInstantView,
    changeLrt,
    clearMoreFilter,
    search,
    styles
  } = props
  const { t } = useTranslation('common')

  if (openedPopupName === 'more') {
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
                {url === 'buy' ? (
                  <div id='filterTitle' className={styles['slot-filter']}>
                    <h2>{t('text_title_type')}</h2>
                    <div
                      className={`${styles['filter-op']} ${styles['btn-group']} btn-group`}
                    >
                      <a
                        id='btn_freehold'
                        className={`${styles['btn']} btn btn-curv ${
                          styles[' btn']
                        } ${styles[' btn-dark-gray']}  btn-dark-gray ${
                          leaseType === 'FREEHOLD' ? styles['active'] : ''
                        }`}
                        onClick={() => changeLeaseType('FREEHOLD')}
                      >
                        {t('btn_freehold')}
                      </a>
                      <a
                        id='btn_leasehold'
                        className={`${styles['btn']} btn btn-curv ${
                          styles[' btn']
                        } ${styles[' btn-dark-gray']} btn-dark-gray ${
                          leaseType === 'LEASEHOLD' ? styles['active'] : ''
                        }`}
                        onClick={() => changeLeaseType('LEASEHOLD')}
                      >
                        {t('btn_leasehold')}
                      </a>
                    </div>
                  </div>
                ) : null}

                {types.indexOf('room') !== -1 && types.length === 1 ? (
                  <div id='filterRoomRoom' className={styles['slot-filter']}>
                    <h2>{t('text_room_type')}</h2>
                    <div
                      className={`${styles['filter-op']} ${styles['btn-group']} btn-group`}
                    >
                      <a
                        id='btn_single'
                        className={`btn btn-curv btn-dark-gray ${
                          styles[' btn']
                        } ${styles[' btn-dark-gray']} ${
                          roomType === 1 ? styles['active'] : ''
                        }`}
                        onClick={() => changeRoomType(1)}
                      >
                        {t('btn_single')}
                      </a>
                      <a
                        id='btn_middle'
                        className={`btn btn-curv btn-dark-gray ${
                          styles[' btn']
                        } ${styles['btn-dark-gray']} ${
                          roomType === 2 ? styles['active'] : ''
                        }`}
                        onClick={() => changeRoomType(2)}
                      >
                        {t('btn_middle')}
                      </a>
                      <a
                        id='btn_master'
                        className={`btn btn-curv btn-dark-gray ${
                          styles[' btn']
                        } ${styles[' btn-dark-gray']} ${
                          roomType === 3 ? styles['active'] : ''
                        }`}
                        onClick={() => changeRoomType(3)}
                      >
                        {t('btn_master')}
                      </a>
                      <a
                        id='btn_any'
                        className={`btn btn-curv btn-dark-gray ${
                          styles[' btn']
                        } ${styles[' btn-dark-gray']} ${
                          roomType === 4 ? styles['active'] : ''
                        }`}
                        onClick={() => changeRoomType(4)}
                      >
                        {t('btn_any')}
                      </a>
                    </div>
                  </div>
                ) : null}

                {types.length === 0 ||
                types.indexOf('highrise') !== -1 ||
                types.indexOf('terrace') !== -1 ||
                types.indexOf('house') !== -1 ||
                types.indexOf('studio') !== -1 ||
                types.indexOf('apartment') !== -1 ||
                types.indexOf('condo') !== -1 ||
                types.indexOf('highrise_sale') !== -1 ||
                types.indexOf('house_sale') !== -1 ? (
                  <div id='filterRoom' className={styles['slot-filter']}>
                    <h2>{t('text_number_of_rooms')}</h2>
                    <div
                      className={`${styles['filter-op']} ${styles['btn-group']} btn-group`}
                    >
                      <a
                        id='btn_studio'
                        className={`${
                          styles['btn']
                        } btn btn-curv btn-dark-gray ${
                          styles[' btn-dark-gray']
                        } ${rooms === 0 ? styles['active'] : ''}`}
                        onClick={() => changeRooms(0)}
                      >
                        {t('btn_studio')}
                      </a>
                      <a
                        id='btn_room_1'
                        className={`${
                          styles['btn']
                        } btn btn-curv btn-dark-gray ${
                          styles[' btn-dark-gray']
                        } ${rooms === 1 ? styles['active'] : ''}`}
                        onClick={() => changeRooms(1)}
                      >
                        1+
                      </a>
                      <a
                        id='btn_room_2'
                        className={`${
                          styles['btn']
                        } btn btn-curv btn-dark-gray ${
                          styles[' btn-dark-gray']
                        } ${rooms === 2 ? styles['active'] : ''}`}
                        onClick={() => changeRooms(2)}
                      >
                        2+
                      </a>
                      <a
                        id='btn_room_3'
                        className={`${
                          styles['btn']
                        } btn btn-curv btn-dark-gray ${
                          styles[' btn-dark-gray']
                        } ${rooms === 3 ? styles['active'] : ''}`}
                        onClick={() => changeRooms(3)}
                      >
                        3+
                      </a>
                      <a
                        id='btn_rooms_more_than_3'
                        className={`${
                          styles['btn']
                        } btn btn-curv btn-dark-gray ${
                          styles[' btn-dark-gray']
                        } ${rooms === 4 ? styles['active'] : ''}`}
                        onClick={() => changeRooms(4)}
                      >
                        {t('btn_more_than_3')}
                      </a>
                    </div>
                  </div>
                ) : null}

                {types.indexOf('room') !== -1 && types.length === 1 ? (
                  <div id='filterRoomToilet' className={styles['slot-filter']}>
                    <h2>{t('text_bathroom_type')}</h2>
                    <div
                      className={`${styles['filter-op']} ${styles['btn-group']} btn-group `}
                    >
                      <a
                        id='btn_private'
                        className={`${
                          styles['btn']
                        } btn btn-curv btn-dark-gray ${
                          styles[' btn-dark-gray']
                        }${bathroomType === 1 ? styles['active'] : ''}`}
                        onClick={() => changeBathroomType(1)}
                      >
                        {t('btn_private')}
                      </a>
                      <a
                        id='btn_shared'
                        className={`${
                          styles['btn']
                        } btn btn-curv btn-dark-gray ${
                          styles[' btn-dark-gray']
                        } ${bathroomType === 2 ? styles['active'] : ''}`}
                        onClick={() => changeBathroomType(2)}
                      >
                        {t('btn_shared')}
                      </a>
                      <a
                        id='btn_any'
                        className={`${
                          styles['btn']
                        } btn btn-curv btn-dark-gray ${
                          styles[' btn-dark-gray']
                        } ${bathroomType === 3 ? styles['active'] : ''}`}
                        onClick={() => changeBathroomType(3)}
                      >
                        {t('btn_any')}
                      </a>
                    </div>
                  </div>
                ) : null}

                {types.indexOf('room') == -1 ? (
                  <div id='filterToilet' className={styles['slot-filter']}>
                    <h2>{t('text_number_of_bathrooms')}</h2>
                    <div
                      className={`${styles['filter-op']} ${styles['btn-group']} btn-group`}
                    >
                      <a
                        id='btn_bathroom_1'
                        className={`${
                          styles['btn']
                        } btn btn-curv btn-dark-gray ${
                          styles[' btn-dark-gray']
                        } ${bathrooms === 1 ? styles['active'] : ''}`}
                        onClick={() => changeBathrooms(1)}
                      >
                        1+
                      </a>
                      <a
                        id='btn_bathroom_2'
                        className={`${
                          styles['btn']
                        } btn btn-curv btn-dark-gray ${
                          styles[' btn-dark-gray']
                        } ${bathrooms === 2 ? styles['active'] : ''}`}
                        onClick={() => changeBathrooms(2)}
                      >
                        2+
                      </a>
                      <a
                        id='btn_bathroom_3'
                        className={`${
                          styles['btn']
                        } btn btn-curv btn-dark-gray ${
                          styles[' btn-dark-gray']
                        } ${bathrooms === 3 ? styles['active'] : ''}`}
                        onClick={() => changeBathrooms(3)}
                      >
                        3+
                      </a>
                      <a
                        id='btn_bathroom_more_than_3'
                        className={`${
                          styles['btn']
                        } btn btn-curv btn-dark-gray ${
                          styles[' btn-dark-gray']
                        } ${bathrooms === 4 ? styles['active'] : ''}`}
                        onClick={() => changeBathrooms(4)}
                      >
                        {t('btn_more_than_3')}
                      </a>
                    </div>
                  </div>
                ) : null}

                <div id='filterCarpark' className={styles['slot-filter']}>
                  <h2>{t('text_number_of_car_parks')}</h2>
                  <div
                    className={`${styles['filter-op']} ${styles['btn-group']} btn-group`}
                  >
                    <a
                      id='btn_carparks_1'
                      className={`${styles['btn']} btn btn-curv btn-dark-gray ${
                        styles[' btn-dark-gray']
                      } ${cars === 1 ? styles['active'] : ''}`}
                      onClick={() => changeCars(1)}
                    >
                      1+
                    </a>
                    <a
                      id='btn_carparks_2'
                      className={`${styles['btn']} btn btn-curv btn-dark-gray ${
                        styles[' btn-dark-gray']
                      } ${cars === 2 ? styles['active'] : ''}`}
                      onClick={() => changeCars(2)}
                    >
                      2+
                    </a>
                    <a
                      id='btn_carparks_3'
                      className={`${styles['btn']} btn btn-curv btn-dark-gray ${
                        cars === 3 ? styles['active'] : ''
                      }`}
                      onClick={() => changeCars(3)}
                    >
                      3+
                    </a>
                    <a
                      id='btn_carparks_more_than_3'
                      className={`${styles['btn']} btn btn-curv btn-dark-gray ${
                        cars === 4 ? styles['active'] : ''
                      }`}
                      onClick={() => changeCars(4)}
                    >
                      {t('btn_more_than_3')}
                    </a>
                  </div>
                </div>
                <div id='filterExtra' className={styles['slot-filter']}>
                  <h2>{t('text_extra_information')}</h2>
                  <div
                    className={`${styles['filter-op']} ${styles['btn-group']} btn-group`}
                  >
                    {url === 'rent' ? (
                      <React.Fragment>
                        <a
                          id='btn_pet_friendly'
                          className={`${
                            styles['btn']
                          } btn btn-curv btn-dark-gray ${
                            petFriendly === 1 ? styles['active'] : ''
                          }`}
                          onClick={changePetFriendly}
                        >
                          {t('btn_pet_friendly')}
                        </a>
                        <a
                          id='btn_accept_all_races'
                          className={`${
                            styles['btn']
                          } btn btn-curv btn-dark-gray ${
                            allRaces === 1 ? styles['active'] : ''
                          }`}
                          onClick={changeAllRaces}
                        >
                          {t('btn_accept_all_races')}
                        </a>
                        <a
                          id='btn_instant_view'
                          className={`${
                            styles['btn']
                          } btn btn-curv btn-dark-gray ${
                            instantView === 1 ? styles['active'] : ''
                          }`}
                          onClick={changeInstantView}
                        >
                          {t('btn_instant_view')}
                        </a>
                      </React.Fragment>
                    ) : null}
                    <a
                      id='btn_nearby_lrt'
                      className={`${styles['btn']} btn btn-curv btn-dark-gray ${
                        lrt === 1 ? styles['active'] : ''
                      }`}
                      onClick={changeLrt}
                    >
                      {t('btn_nearby_lrt')}
                    </a>
                  </div>
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
                    onClick={search}
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

export default FilterMore
