import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ReactPaginate from 'react-paginate'
import CloseIcon from '@material-ui/icons/Close'
import { animateScroll as scroll } from 'react-scroll'
import { useRouter } from 'next/router'
import Head from '../../../components/Common/Head'
import { deleteFavorite, getFavPropertyList } from '../../../actions'
import CONST from '../../../globalutilities/consts'
import BreadCrumb from '../../../components/Common/BreadCrumb'
import PropertyItem from '../../../components/PropertyList/PropertyListItem'

import Loader from '../../../components/Common/Loader'
import { getToken, getUserId } from '../../../globalutilities/helpers'
import styles from './fav.module.scss'

const initPage = {
  pageNumber: 0,
  pageSize: 9,
  sort: '-dateCreated'
}

const Favorites = props => {
  const router = useRouter()

  const [params, setParams] = useState(initPage)
  const [isLoading, setisLoading] = useState(true)
  const [favorites, setfavorites] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, settotalElements] = useState(0)
  const [pageable, setpageable] = useState({})
  const { t } = useTranslation('common')

  useEffect(() => {
    const query = {
      pageNumber: 0,
      pageSize: 9,
      sort: '-dateCreated'
    }
    getPropertyList(query)
  }, [])

  const getPropertyList = async query => {
    props.getFavPropertyList({ ...query }).then(res => {
      if (res && res.type === 'success') {
        const { content, totalPages, totalElements, pageable } =
          res.favorites || {}
        setfavorites(content || [])
        setTotalPages(totalPages || 0)
        settotalElements(totalElements || 0)
        setpageable({ ...pageable, sort: '-dateCreated' } || {})
        setisLoading(false)
      } else {
        setisLoading(false)
      }
    })
  }

  const onFavEvent = async propertyId => {
    setisLoading(true)
    const response = await deleteFavorite(propertyId)

    toast(
      response.success
        ? 'Property successfully removed from favourites'
        : response.message || 'Something went wrong',
      {
        autoClose: CONST.ToastTimeout,
        type: response.success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR
      }
    )
    if (response.success) {
      await getPropertyList(initPage)
    }
    setisLoading(false)
  }

  const onPageChange = page => {
    setisLoading(true)
    setpageable({ ...pageable, pageNumber: parseInt(page, 10) })
    getPropertyList({
      ...pageable,
      pageNumber: parseInt(page, 10)
    })
    scroll.scrollToTop()
  }

  return (
    <section className={styles['fav-section']}>
      <ToastContainer />

      <Head title={t('dashboard:favourites_title')} />
      <main id='main' className='inner-pages'>
        <BreadCrumb breadCrumb={CONST.dashboardFavorites} />
        <div className='page-main-title user-main-title'>
          <div className='container'>
            <div className={styles['result-count']}>
              {totalElements} results
            </div>
            <h1>{t('dashboard:text_favorites')}</h1>
            <a className='close' href='/dashboard'>
              <CloseIcon />
            </a>
          </div>
        </div>
        <div className='container'>
          <div className='row pro-row'>
            {isLoading ? (
              <Loader />
            ) : (
              favorites.map((item, index) => (
                <div className={styles['PropertyList__item--wrapper']}>
                  <PropertyItem
                    key={item.id}
                    data={item.property}
                    router={router}
                    index={index}
                    onFavEvent={e => {
                      e.preventDefault()
                      onFavEvent(item.id)
                    }}
                  />
                </div>
              ))
            )}
          </div>
          {totalPages > 1 ? (
            <div className='btn-wrapper pb-40 text-right'>
              <div className='pagination text-right'>
                <ReactPaginate
                  pageCount={totalPages}
                  pageRangeDisplayed={4}
                  marginPagesDisplayed={0}
                  breakLabel={''}
                  // forcePage={clientPropertyList.number}
                  previousLabel='&lt; Prev'
                  nextLabel='Next &gt;'
                  activeLinkClassName='current'
                  onPageChange={pageNum => {
                    onPageChange(pageNum.selected)
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </section>
  )
}

const mapStateToProps = state => {
  return {
    favListing: '',
    language: state.language
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFavPropertyList: query =>
      dispatch(
        getFavPropertyList(
          {
            id: getUserId(),
            authToken: getToken()
          },
          query
        )
      )
  }
}

export async function getServerSideProps () {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
