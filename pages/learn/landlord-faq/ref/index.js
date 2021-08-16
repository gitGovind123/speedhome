import React from 'react'
import { Container } from 'react-bootstrap'
import { withRouter } from 'next/router'

import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import BasicFAQ from '../../../../components/Learn/BasicFaq'
import ZeroDepositFAQ from '../../../../components/Learn/ZeroDeposit'
import InsuranceFAQ from '../../../../components/Learn/InsuranceFAQ'
import RoomRentalFAQ from '../../../../components/Learn/RoomRentalFAQ'
import PaymentFAQ from '../../../../components/Learn/PaymentFAQ'
import TenancyFAQ from '../../../../components/Learn/TenancyFAQ'
import ReferralProgrammeFAQ from '../../../../components/Learn/ReferralProgrammeFAQ'
import BokkingFeeFAQ from '../../../../components/Learn/BokkingFeeFAQ'
import OcdFAQ from '../../../../components/Learn/OcdFAQ'
import CoverFAQ from '../../../../components/Learn/CoverFAQ'

import styles from '../../learnIndex.module.scss'

const LandlordFaq = props => {
  const lang = props.router.locale || 'en'
  const [isMalaysian, isChinese] = [lang === 'my', lang === 'zh']
  const isEnglish = !isMalaysian && !isChinese
  const { t } = useTranslation('common')
  return (
    <div>
      <Container>
        {lang == 'en' ? (
          <div className={styles['commonLanguage']}>
            <Link href='/learn/landlord-faq' locale='my'>
              <a className={styles['submenuForLanguage']}>Versi Bahasa</a>
            </Link>
            <Link href='/learn/landlord-faq' locale='zh'>
              <a className={styles['submenuForLanguage']}> 阅读中文版</a>
            </Link>
          </div>
        ) : lang == 'my' ? (
          <div className={styles['commonLanguagemy']}>
            <Link href='/learn/landlord-faq' locale='en'>
              <a className={styles['submenuForLanguage']}>English Version</a>
            </Link>
            <Link href='/learn/landlord-faq' locale='zh'>
              <a className={styles['submenuForLanguage']}>阅读中文版</a>
            </Link>
          </div>
        ) : lang == 'zh' ? (
          <div className={styles['commonLanguagezn']}>
            <Link href='/learn/landlord-faq' locale='en'>
              <a className={styles['submenuForLanguage']}>English Version</a>
            </Link>
            <Link href='/learn/landlord-faq' locale='my'>
              <a className={styles['submenuForLanguage']}>Versi Bahasa</a>
            </Link>
          </div>
        ) : (
          Null
        )}
        <div className={styles['landlord__root--position']}>
          <CoverFAQ styles={styles} />

          <BasicFAQ
            isMalaysian={isMalaysian}
            isEnglish={isEnglish}
            isChinese={isChinese}
            styles={styles}
          />
          <ZeroDepositFAQ styles={styles} />
          <OcdFAQ styles={styles} />
          <InsuranceFAQ
            isMalaysian={isMalaysian}
            isEnglish={isEnglish}
            isChinese={isChinese}
            styles={styles}
          />

          <RoomRentalFAQ styles={styles} />
          <PaymentFAQ
            isMalaysian={isMalaysian}
            isEnglish={isEnglish}
            isChinese={isChinese}
            styles={styles}
          />
          <TenancyFAQ styles={styles} />
          <ReferralProgrammeFAQ styles={styles} />
          <BokkingFeeFAQ styles={styles} />
        </div>
        <p className={styles['landloard__ans--faq']} style={{ marginLeft: 0 }}>
          <b>{t('learn:landlord_faq_booking_q5_ans_9')}</b>
        </p>
        <p
          className={styles['landloard__ans--faq']}
          style={{ textAlign: 'center', marginLeft: 0 }}
        >
          {t('learn:landlord_faq_booking_q5_ans_10')}
          <a href='mailto:hello@speedhome.com'>hello@speedhome.com</a>
          {t('learn:landlord_faq_booking_q5_ans_11')}
          <a href='tel:+60187777650'>
            +60 18 7777 650
            {props.language === 'zh' ? '与 WhatsApp 联系我们。' : null}
          </a>
        </p>
        <p className={styles['landloard__ans--faq']} style={{ marginLeft: 0 }}>
          <small>
            <em>{t('learn:landlord_faq_booking_q5_ans_12')}</em>
          </small>
        </p>
      </Container>
    </div>
  )
}
export default withRouter(LandlordFaq)
