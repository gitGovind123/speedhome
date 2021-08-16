import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import Head from '../Common/Head'
import styles from './PageNotFound.module.scss'

const PageNotFound = props => {
  return (
    <React.Fragment>
      <Head
        title={'Page not found'}
        description={
          'Sorry, but the page you are looking for does not exist, have been removed, has its name changed or is\n' +
          ' temporarily unavailable. Please find and contact us on SpeedRent.'
        }
        keywords={'Page not found'}
      />
      <div className='container'>
        <div id={styles['notfound']}>
          <div className={styles['notfound']}>
            <div className={styles['notfound-404']} />
            <h1>404</h1>
            <h2>404</h2>
            <p>
              Sorry, but the page you are looking for does not exist, have been
              removed, has its name changed or is temporarily unavailable.
              Please find and contact us on SPEEDHOME.
            </p>

            <Link href={'/'}>
              <a>Back to Homepage</a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

function mapStateToProps (state) {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps, null)(PageNotFound)
