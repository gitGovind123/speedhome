import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Link from 'next/link'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'

import useTranslation from 'next-translate/useTranslation'

import Head from '../../../components/Common/Head'
import CONST from '../../../globalutilities/consts'
import BreadCrumb from '../../../components/Common/BreadCrumb'
import Properties from '../../../components/dashboard/listing/Properties'

import { updateProperty } from '../../../actions'
import Loader from '../../../components/Common/Loader'
import TabContainer from '../../../components/dashboard/listing/TabContainer'
import { Row, Col, Container } from 'react-bootstrap'

const initPage = {
  pageNumber: 0,
  pageSize: 3,
  sort: '-dateCreated'
}

export const ACTIVE_TAB = {
  type: 'ACTIVE',
  falg: 'isNotActiveList'
}

export const ARCHIVED_TAB = {
  type: 'INACTIVE',
  flag: 'isNotArchivedList'
}
export const REJECTED_TAB = {
  type: 'SUSPENDED',
  flag: 'isNotRejectedList'
}

export const EXPIRED_TAB = {
  type: 'EXPIRED',
  flag: 'isNotExpiredList'
}

const Listings = props => {
  const [isLoading, setIsloading] = useState(false)
  const [isNotActiveList, setIsNotActiveList] = useState(false)
  const [isNotExpiredList, setIsNotExpiredList] = useState(false)
  const [isNotRejectedList, setIsNotRejectedList] = useState(false)
  const [isNotArchivedList, setIsNotArchivedList] = useState(false)
  const [selectedTab, setSelectedTab] = useState(ACTIVE_TAB)

  const { t } = useTranslation('common')

  const onUpdate = async (propertyId, changeFrom, changeTo) => {
    setIsloading(true)
    const response = await updateProperty(propertyId, changeTo)
    toast(
      response.success
        ? `Property moved to ${changeTo} successfully.`
        : response.message || 'Something went wrong',
      {
        autoClose: CONST.ToastTimeout,
        type: response.success ? toast.TYPE.SUCCESS : toast.TYPE.ERROR
      }
    )

    setIsloading(false)
  }

  const onListFlagUpdate = (key, val) => {
    switch (key) {
      case 'isNotArchivedList':
        setIsNotActiveList(val)
        return
      case 'isNotRejectedList':
        setIsNotRejectedList(val)
        return

      case 'isNotExpiredList':
        setIsNotExpiredList(val)
        return

      default:
        return
    }
  }
  const handleTabChange = type => {
    setSelectedTab(type)
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Head title={t('dashboard:Listing_title')} />
      <main id='main' className='inner-pages'>
        <BreadCrumb breadCrumb={CONST.dashboardMylisting} />
        <div className='page-main-title user-main-title'>
          <div className='container'>
            <h1>{t('text_dashboard_mylisting_mylisting')}</h1>
            <a className='close' href={'/dashboard'}>
              <CloseIcon />
            </a>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <Container>
              <Row>
                <Col>
                  {selectedTab ? (
                    <TabContainer
                      selectedTab={selectedTab}
                      handleTabChange={handleTabChange}
                    >
                      {selectedTab.type === ACTIVE_TAB.type ? (
                        <Properties
                          type={selectedTab.type}
                          flag={selectedTab.flag}
                          initPage={initPage}
                          isLoading={isLoading}
                          onUpdate={onUpdate}
                          onListFlagUpdate={onListFlagUpdate}
                        />
                      ) : null}
                      {selectedTab.type === EXPIRED_TAB.type ? (
                        <Properties
                          type={selectedTab.type}
                          flag={selectedTab.flag}
                          initPage={initPage}
                          isLoading={isLoading}
                          onUpdate={onUpdate}
                          onListFlagUpdate={onListFlagUpdate}
                        />
                      ) : null}

                      {selectedTab.type === REJECTED_TAB.type ? (
                        <Properties
                          type={selectedTab.type}
                          flag={selectedTab.flag}
                          initPage={initPage}
                          isLoading={isLoading}
                          onUpdate={onUpdate}
                          onListFlagUpdate={onListFlagUpdate}
                        />
                      ) : null}
                      {selectedTab.type === ARCHIVED_TAB.type ? (
                        <Properties
                          type={selectedTab.type}
                          flag={selectedTab.flag}
                          initPage={initPage}
                          isLoading={isLoading}
                          onUpdate={onUpdate}
                          onListFlagUpdate={onListFlagUpdate}
                        />
                      ) : null}
                    </TabContainer>
                  ) : null}
                </Col>
              </Row>
            </Container>

            <div
              className='container mt-3'
              id='prop_arch_segment'
              style={{ display: `${isNotArchivedList ? 'none' : 'block'}` }}
            >
              <div className='btn-wrapper pb-40 text-right'>
                <Link href={'/post'}>
                  <a className='btn btn-curv btn-primary btn-primary-filled'>
                    {t('dashboard:text_add_property')} <AddIcon />
                  </a>
                </Link>
              </div>
            </div>
            <br></br>
          </div>
        )}
      </main>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  language: state.language
})

const mapDispatchToProps = dispatch => ({
  createNotification: config => {
    dispatch(createNotification(config))
  }
})

export async function getServerSideProps () {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings)
