import React from 'react'
import Slider from 'react-slick'
import { Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import PrefsDB from '../../globalutilities/prefs'

const HomePerf = ({ styles, isMobile, prefSettings, getLangRef }) => {
  return (
    <section className={styles['pref-block']}>
      <Container>
        <Row>
          {!isMobile ? (
            <div className={styles['pref-items-wrapper']}>
              {PrefsDB.map((item, index) => {
                return (
                  <div
                    className={styles['pref-item-wrapper']}
                    style={{
                      width: '33%'
                    }}
                    key={index}
                  >
                    <div className={styles['pref-item']}>
                      <Image
                        effect='blur'
                        src={item.image}
                        alt={item.title}
                        width={102}
                        height={87}
                      />
                      <h5>{item.title[getLangRef()]}</h5>
                      <p>{item.text[getLangRef()]}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <Slider {...prefSettings} className={styles['pref-slider']}>
              {PrefsDB.map((item, index) => {
                return (
                  <div className={styles['pref-item-wrapper']} key={index}>
                    <div className={styles['pref-item']}>
                      <Image
                        width={102}
                        height={87}
                        effect='blur'
                        src={item.image}
                        alt={item.title}
                      />
                      <h5>{item.title[getLangRef()]}</h5>
                      <p>{item.text[getLangRef()]}</p>
                    </div>
                  </div>
                )
              })}
            </Slider>
          )}
        </Row>
      </Container>
    </section>
  )
}

export default HomePerf
