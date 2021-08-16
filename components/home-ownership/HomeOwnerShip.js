import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

import CalenderIcon from '@material-ui/icons/DateRangeOutlined'

import { getPropertyNameLink } from '../Common/Helper'
import BreadCrumb from '../Common/BreadCrumb'
import CONST from '../../globalutilities/consts'

import styles from './HomeOwnerShip.module.scss'

const HomeOwnership = props => {
  const { homeOwnershipList } = props
  return (
    <main className='main'>
      <BreadCrumb breadCrumb={CONST.homeOwnership} />

      <div className='container'>
        <div className={styles['results-main']}>
          <div className={`row ${styles['pro-row']}`}>
            {homeOwnershipList &&
              homeOwnershipList.map(item => {
                return (
                  <div
                    className={`${styles['pro-col']}  col-xs-12 col-sm-4`}
                    key={item.name}
                  >
                    <div className={`${styles['inner']} ${styles['paper']}`}>
                      <div className={styles['product-thumb']}>
                        <Link
                          href={`/home-ownership/${getPropertyNameLink(
                            item.name
                          )}`}
                        >
                          <a>
                            <img
                              loading='lazy'
                              src={item.galleryImages[0]}
                              alt=''
                            />
                          </a>
                        </Link>
                      </div>
                      <div className='des'>
                        <div
                          className={styles['top']}
                          style={{ flex: 1, flexDirection: 'column' }}
                        >
                          <h2 style={{ flex: 1, height: '58px' }}>
                            <Link
                              href={`/home-ownership/${getPropertyNameLink(
                                item.name
                              )}`}
                            >
                              <a
                                style={{
                                  flexWrap: 'wrap',
                                  justifyContent: 'space-between',
                                  display: 'flex',
                                  flexDirection: 'column'
                                }}
                              >
                                <span
                                  style={{
                                    marginRight: '5px',
                                    marginBottom: '7px',
                                    fontSize: '18px'
                                  }}
                                >
                                  {item.name}
                                </span>

                                <small style={{ fontWeight: 'bold' }}>
                                  {item.city}
                                </small>
                              </a>
                            </Link>
                          </h2>
                          <div style={{ flex: 1 }}>
                            <div className={styles['price']}>{item.price}</div>
                          </div>
                        </div>
                        <div className='sub'>
                          <div className={styles['avl-date']}>
                            <CalenderIcon
                              style={{
                                fontSize: '1.3em',
                                marginRight: '3px'
                              }}
                            />
                            <block text='${project.available}'>
                              {item.launch}
                            </block>
                          </div>
                          <div className='sqft-range' text='${project.sqft}'>
                            {item.sqft}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default withRouter(HomeOwnership)
