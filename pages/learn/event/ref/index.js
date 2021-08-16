import React from 'react'
import { Container } from 'react-bootstrap'

import styles from '../../learnIndex.module.scss'

const Event = () => {
  return (
    <div>
      <Container>
        <div className={styles['event-root']}>
          <div className={styles['event__text']}>
            Due to MCO all our events have been replaced with online webinar.
          </div>
          <img className={styles['event__img']} src={'/img/learnevent.png'} alt='' />
          <a
            href='https://speedhome.com/blog/webinars/'
            target='_blank'
            rel='noopener noreferrer'
            className={styles['event__button']}
          >
            Know more
          </a>
        </div>
      </Container>
    </div>
  )
}
export default Event
