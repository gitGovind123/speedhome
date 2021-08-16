import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

function ReferKnowMore ({ alignMiddle = false, styles }) {
  const { t } = useTranslation('common')
  return (
    <div className={styles['refer-want-know']}>
      <div
        className={`${styles['want-know__head']} ${
          alignMiddle ? 'center' : ''
        }`}
      >
        {t('more:refer_know_more')}
      </div>
      <div className={styles['refer-faq']}>
        <img src={'/img/icons/forum-yellow-24px.svg'} alt='' />
        <div className={styles['refer-faq__text']}>
          <Link href={'/more/refer/faq'}>
            <a
              style={{
                color: '#000'
              }}
            >
              <div>{t('more:refer_ask_ques')}</div>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles['refer-tac']}>
        <img src={'/img/icons/description-yellow-24px.svg'} alt='' />
        <div className={styles['refer-tac__text']}>
          <Link href={'/more/refer/termscondition'}>
            <a
              style={{
                color: '#000'
              }}
            >
              <div>{t('more:refer_terms_condition')}</div>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles['refer-tac']}>
        <img src={'/img/icons/referral_winner-yellow-24px.svg'} alt='' />
        <div className={styles['refer-tac__text']}>
          <a
            href='https://speedhome.com/blog/referral-program-reward-list/'
            target='_blank'
          >
            <div style={{ color: '#000' }}>{t('more:refer_leader')}</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ReferKnowMore
