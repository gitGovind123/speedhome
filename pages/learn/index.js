import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

import Blog from './blog/ref/index'
import Event from './event/ref/index'
import LandlordFaq from './landlord-faq/ref/index'
import TenantFaq from './tenant-faq/ref/index'

import { learnItemsAction } from '../../actions/learn'
import { withRouter } from 'next/router'
import { bindActionCreators } from 'redux'

import styles from './learnIndex.module.scss'

const Learn = ({ learnItem: activeTag, learnItemsAction, language }) => {
  const { t } = useTranslation('common')
  const setLearnItem = item => () => {
    learnItemsAction(item)
  }

  return (
    <div style={{ marginTop: '-3.9rem' }}>
      <div className={styles['learn__heading--root']}>
        <Container>
          <div className={styles['learn_back-home']}>
            <div className={styles['learn__home']}>
              <Link href={'/'}>
                <div>Home</div>
              </Link>
            </div>
            <span className={styles['learn__divider']}>|</span>
            <div className={styles['learn__text']}>
              <Link href={'/learn'}>
                <div>Learn</div>
              </Link>
            </div>
          </div>
          <h1 className={styles['learn__head--height']}>Learn</h1>
          <div className={styles['learn-blog-list__items']}>
            <Link href={'/learn/event'}>
              <div
                onClick={setLearnItem('webinar')}
                className={
                  activeTag == 'webinar'
                    ? `${styles['list__items--margin']} ${styles['active-tag']}`
                    : styles['list__items--margin']
                }
              >
                Event
              </div>
            </Link>
            <Link href={'/learn/blog'}>
              <div
                onClick={setLearnItem('blog')}
                className={
                  activeTag == 'blog'
                    ? `${styles['list__items--margin']} ${styles['active-tag']}`
                    : styles['list__items--margin']
                }
              >
                Blog
              </div>
            </Link>
            <Link href={'/learn/landlord-faq'}>
              <div
                data-testId='landlordfaq_tab'
                onClick={setLearnItem('landlordfaq')}
                className={
                  activeTag == 'landlordfaq'
                    ? `${styles['list__items--margin']} ${styles['active-tag']}`
                    : styles['list__items--margin']
                }
                style={{ textAlign: 'center' }}
              >
                {t('learn:landlord_heading_text')}
              </div>
            </Link>
            <Link href={'/learn/tenant-faq'}>
              <div
                onClick={setLearnItem('tenantfaq')}
                className={
                  activeTag == 'tenantfaq'
                    ? `${styles['list__items--margin']} ${styles['active-tag']}`
                    : styles['list__items--margin']
                }
              >
                {t('learn:tenant_heading_text')}
              </div>
            </Link>
          </div>
        </Container>
      </div>
      {activeTag == 'blog' && <Blog />}
      {activeTag == 'webinar' && <Event />}
      {activeTag == 'tenantfaq' && <TenantFaq />}
      {activeTag == 'landlordfaq' && <LandlordFaq />}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    learnItem: state.learnReducer.learnItem,
    language: state.language
  }
}

function actionsStateToProps (dispatch) {
  return {
    learnItemsAction: bindActionCreators(learnItemsAction, dispatch)
  }
}

export default connect(mapStateToProps, actionsStateToProps)(withRouter(Learn))
