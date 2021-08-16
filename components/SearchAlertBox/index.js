import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import Card from 'react-bootstrap/Card'
import styles from './SearchAlertBox.module.scss'
import { connect } from 'react-redux'
import { setEmailPopup } from '../../actions/authActions'

const SearchAlertBox = props => {
  const { mobile, handleOpenAlertModal } = props
  const { t } = useTranslation('common')

  const handleModal = () => {
    props.user && !props.user.email
      ? props.openUpdateEmailPopUpModal()
      : handleOpenAlertModal()
  }
  const cardClassName = `flex-grow-1 ${styles['alert-ui-card']} ${
    mobile ? `mb-3 d-sm-none ${styles['alert-ui-card']}` : ''
  }`

  return (
    <Card
      className={cardClassName}
      style={{
        boxShadow: '0 6px 6px rgba(0, 0, 0, 0.16)'
      }}
    >
      <Card.Body className='bg-light'>
        <p className='clearfix m-0'>
          <b className='pull-left'>{t('text_alert_for_this_search')}</b>
          <a
            className={`btn btn-primary btn-sm rounded-pill float-right ${styles['btn_notify_me']}`}
            onClick={handleModal}
          >
            {t('btn_notify_me')}
          </a>
        </p>
        <p className={`m-0 text-muted ${styles['text-muted']}`}>
          {t('text_new_listings_become_available')}
        </p>
      </Card.Body>
    </Card>
  )
}
const mapStateToProps = state => ({
  user: state.auth.user,
  st: state
})
const mapDispatchToProps = {
  emailAction: setEmailPopup
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchAlertBox)
