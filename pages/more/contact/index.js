import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Container } from 'react-bootstrap'

import Head from '../../../components/Common/Head'
import BreadCrumb from '../../../components/Common/BreadCrumb'
import CONST from '../../../globalutilities/consts'
import styles from './contact.module.scss'
import { triggerGTAG } from '../../../utils/utils'

const triggerWhatsappGTAG = () => {
  triggerGTAG({
    event: 'WA_Option'
  })
}

const ContactUs = props => {
  const { t } = useTranslation('common')
  return (
    <React.Fragment>
      <Head title={t('more:contact_title')} />
      <main id='main'>
        <BreadCrumb breadCrumb={CONST.moreContact} />

        <div className='static-content contact-container'>
          <Container>
            <div className='page-main-title user-main-title'>
              <div className='container'>
                <h1>{t('more:text_Keep_in_touch')}</h1>
              </div>
            </div>
            <div className={styles['shadow-box']}>
              <div className='row'>
                <div className='col-xs-12 col-md-6 text-center'>
                  <img
                    loading='lazy'
                    src={'/img/icons/ico-02.svg'}
                    width={274}
                    alt='Speedhome'
                  />
                </div>
                <div className={`col-xs-12 col-md-6 ${styles['col-des']}`}>
                  <strong className={styles['content-title']}>
                    {t('more:text_general')}
                  </strong>
                  <p>
                    <a href='mailto:hello@speedhome.com'>hello@speedhome.com</a>
                    <br />
                    <a href='tel:+60374910088'>+603 7491 0088</a>
                    <br />
                    <a
                      href='https://wa.me/601111930181'
                      target='_blank'
                      onClick={() => {
                        triggerWhatsappGTAG()
                      }}
                    >
                      +6011 1193 0181 (WhatsApp Only)
                    </a>
                  </p>
                  <strong className={styles['content-title']}>
                    {t('more:text_financeclaims')}
                  </strong>
                  <p>
                    <a href='mailto:finance@speedhome.com'>
                      finance@speedhome.com
                    </a>
                  </p>

                  <strong className={styles['content-title']}>
                    {t('more:text_partnership_cola')}
                  </strong>
                  <p>
                    Kenneth Gan
                    <br />
                    <a href='mailto:kennethgan@speedhome.com'>
                      kennethgan@speedhome.com
                    </a>
                    <br />
                    <a href='tel:+6018 2192 696'>+6018 2192 696</a>
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  )
}

export async function getServerSideProps () {
  return {}
}
export default ContactUs
