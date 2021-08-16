import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'

import styles from './Review.module.scss'

const Review = () => {
  const plansSettings = {
    dots: false,
    infinite: true,
    // arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false
        }
      }
    ]
  }
  return (
    <div
      className={styles['customer_review']}
      //   style={{ textAlign: 'left', marginBottom: '20px' }}
    >
      <div className={styles['reviews__heading--text']}>Reviews</div>
      <Slider {...plansSettings}>
        <div>
          <div
            className={styles['review__card-container']}
            style={{ margin: '10px 20px 10px 2px' }}
          >
            <div className={styles['review__heading--root']}>
              <Image
                loading='lazy'
                className={styles['review__img']}
                src='/img/icons/colored-avatar-circle.svg'
                alt='avatar'
                width={50}
                height={50}
              />
              <div className={styles['review__person']}>
                <div className={styles['review__person-name']}>
                  Zaidi Zainal
                </div>
                <div className={styles['review__person-prof']}>Local Guide</div>
              </div>
              <div className={styles['review__rating-container']}>
                <Image
                  loading='lazy'
                  src={'/img/icons/staricon.png'}
                  alt='staricon'
                  width={50}
                  height={50}
                />
                <div className={styles['review__star']}>
                  <span>5/</span>
                  <span>5</span>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles['review__text-details']}>
              Speedhome is a good place if you want to find a place if you want
              to find a place to stay without spending so much money on deposit
              while they also protection for landlords if something appen during
              the rental period. Its a win-win situation for both tenant and
              landlords
            </div>
          </div>
        </div>
        <div>
          <div
            className={styles['review__card-container']}
            style={{ margin: '10px 0px 10px 0px' }}
          >
            <div className={styles['review__heading--root']}>
              <div className={styles['review__img']}>
                <Image
                  loading='lazy'
                  src='/img/suechew.png'
                  alt='suechew'
                  width={50}
                  height={50}
                />
              </div>

              <div className={styles['review__person']}>
                <div className={styles['review__person-name']}>
                  Sue Chew Yap
                </div>
                <div className={styles['review__person-prof']}>Local Guide</div>
              </div>
              <div className={styles['review__rating-container']}>
                <Image
                  loading='lazy'
                  src={'/img/icons/staricon.png'}
                  alt='staricon'
                  width={50}
                  height={50}
                />
                <div className={styles['review__star']}>
                  <span>5/</span>
                  <span>5</span>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles['review__text-details']}>
              Innovative home rental concept doing away agent's commission and
              using insurance to protect landlord's rights
            </div>
          </div>
        </div>
        <div>
          <div
            className={styles['review__card-container']}
            style={{ margin: '10px 2px 10px 20px' }}
          >
            <div className={styles['review__heading--root']}>
              <div className={styles['review__img']}>
                <Image
                  loading='lazy'
                  src='/img/liana.png'
                  alt='liana'
                  width={50}
                  height={50}
                />
              </div>

              <div className={styles['review__person']}>
                <div className={styles['review__person-name']}>Liana Zaman</div>
                <div className={styles['review__person-prof']}>Local Guide</div>
              </div>
              <div className={styles['review__rating-container']}>
                <Image
                  loading='lazy'
                  src={'/img/icons/staricon.png'}
                  alt='staricon'
                  width={50}
                  height={50}
                />
                <div className={styles['review__star']}>
                  <span>5/</span>
                  <span>5</span>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles['review__text-details']}>
              Amazing service! They guide you each step of the way right from
              the minute you're interested with a place, meeting the landlord,
              agreeing, and monthly payment. if the designed agent were not
              reachable, they will let you reach out to another, and they will
              always get your feedback. It feels safe and trustworthy doing
              business with them compared to individual agent, for both landlord
              (who will be covered by insurance) and the tenant.
              <p>FIVE STARS!</p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default Review
