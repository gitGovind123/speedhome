import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import styles from './YoutubeZDEVideo.module.scss'

const YoutubeZDEVideo = props => {
  return (
    <Container>
      <Row>
        <Col md={12} style={{ padding: '0' }}>
          <div className={styles['youtubevideoPlayerContainerPost']}>
            <div
              className={
                styles['youtubevideoPlayerContainerPost--iframeContainer']
              }
            >
              <iframe
                src='https://www.youtube.com/embed/TUwLWiIlZC0?autoplay=1'
                width='100%'
                height={'100%'}
                allow='autoplay'
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default YoutubeZDEVideo
