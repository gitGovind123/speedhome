import React from 'react'
import { Container, Row } from 'react-bootstrap'
import useTranslation from 'next-translate/useTranslation'

import styles from './index.module.scss'
import Image from 'next/image'

const FeaturedIn = props => {
  const { t } = useTranslation('common')

  return (
    <section className={styles['featured-block']}>
      <Container>
        <Row>
          <h4>{t('home:home_featured_in_head')}</h4>
          <div className={styles['featured-block_before_img_div']}>
            <Image
              effect='blur'
              src='/img/digitalnewsasia.png'
              alt='Digital News Asia'
              width={90}
              height={90}
            />
            <Image
              effect='blur'
              src='/img/sinchew.png'
              alt='Sin Chew'
              width={90}
              height={90}
            />
            <Image
              effect='blur'
              src='/img/astro_awani.png'
              alt='Astro Awani'
              width={90}
              height={90}
            />
            <Image
              effect='blur'
              src='/img/techinasia.png'
              alt='TechInAsia'
              className={styles['long-logo']}
              width={90}
              height={90}
            />
            <Image
              effect='blur'
              src='/img/straits_times.png'
              alt='Straits Times'
              className={styles['long-logo']}
              width={90}
              height={90}
            />
            <Image
              effect='blur'
              src='/img/utusan_online.png'
              alt='Utusan Online'
              width={90}
              height={90}
            />
          </div>
        </Row>
      </Container>
    </section>
  )
}

export default React.memo(FeaturedIn)
