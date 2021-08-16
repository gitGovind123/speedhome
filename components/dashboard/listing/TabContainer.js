import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import {
  ACTIVE_TAB,
  EXPIRED_TAB,
  ARCHIVED_TAB,
  REJECTED_TAB
} from '../../../pages/dashboard/listings'

import styles from './TabContainer.module.scss'

const TabContainer = props => {
  const { selectedTab, handleTabChange } = props

  return (
    <>
      <Row>
        <Col>
          <div className={styles['tabs__container']}>
            <div
              className={
                selectedTab.type === ACTIVE_TAB.type
                  ? `${styles['tabs__btnContainer']} ${styles['tabs__btnContainerActive']}`
                  : styles['tabs__btnContainer']
              }
            >
              <Button
                onClick={() => handleTabChange(ACTIVE_TAB)}
                className={styles['tabs__btn']}
              >
                Active
              </Button>
            </div>
            <div
              className={
                selectedTab.type === ARCHIVED_TAB.type
                  ? `${styles['tabs__btnContainer']} ${styles['tabs__btnContainerActive']}`
                  : styles['tabs__btnContainer']
              }
            >
              <Button
                onClick={() => handleTabChange(ARCHIVED_TAB)}
                className={styles['tabs__btn']}
              >
                Archive
              </Button>
            </div>
            <div
              className={
                selectedTab.type === REJECTED_TAB.type
                  ? `${styles['tabs__btnContainer']} ${styles['tabs__btnContainerActive']}`
                  : styles['tabs__btnContainer']
              }
            >
              <Button
                onClick={() => handleTabChange(REJECTED_TAB)}
                className={styles['tabs__btn']}
              >
                Rejected
              </Button>
            </div>
            <div
              className={
                selectedTab.type === EXPIRED_TAB.type
                  ? `${styles['tabs__btnContainer']} ${styles['tabs__btnContainerActive']}`
                  : styles['tabs__btnContainer']
              }
            >
              <Button
                onClick={() => handleTabChange(EXPIRED_TAB)}
                className={styles['tabs__btn']}
              >
                Expired
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles['tabs__result']}>{props.children}</div>
        </Col>
      </Row>
    </>
  )
}

export default TabContainer
