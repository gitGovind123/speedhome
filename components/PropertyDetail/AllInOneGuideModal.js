import React from 'react'
import Modal from '../Common/Modal'
import useTranslation from 'next-translate/useTranslation'
import styles from './AllInOneGuideModal.module.scss'

const AllInOneGuideModal = ({ onClose }) => {
  const { t } = useTranslation('common')
  return (
    <Modal style={{ zIndex: '9999 !important' }}>
      <div
        className={`${styles['white-popup']} ${styles['fullscreen']} ${styles['padding-side']}`}
        id='tenantContainer'
      >
        <main>
          <div className={styles['static-content']}>
            <div className='container'>
              <div className='inner'>
                <div className={`${styles['slot-main']} ${styles['top-pos']}`}>
                  <div className={`${styles['pos-inner']} d-flex`}>
                    <div className='txt'>
                      <h2>{t('text_more_tenant_guide_our_all')}</h2>
                      <a
                        href='https://speedhome.com/download/speedhome-tenant-guidebook.pdf'
                        target='_blank'
                      >
                        {t('text_more_tenant_guide_pdfurl')}
                      </a>
                    </div>
                    <div className='ico'>
                      <img loading='lazy' src='/img/icons/ico-pdf.png' alt />
                    </div>
                  </div>
                </div>
                <div className={styles['slot-main']}>
                  <h2>General</h2>
                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_guide_what_is')}
                  </strong>
                  <p>{t('text_more_tenant_guide_what_is_ans')}</p>
                  <ul className='general-list-content'>
                    <li>
                      <strong className={styles['content-title']}>
                        {t('text_more_tenant_guide_does_the')}
                      </strong>
                      <p>{t('text_more_tenant_guide_does_the_ans')}</p>
                    </li>
                    <li>
                      <strong className={styles['content-title']}>
                        {t('text_more_tenant_guide_what_do')}
                      </strong>
                      <p>
                        {t('text_more_tenant_guide_what_do_ans')}
                        <a href='mailto:hello@speedhome.com'>
                          {' '}
                          hello@speedhome.com
                        </a>
                      </p>
                    </li>
                    <li>
                      <strong className={styles['content-title']}>
                        {t('text_more_tenant_guide_who_pays')}
                      </strong>
                      <p>{t('text_more_tenant_guide_who_pays_ans')}</p>
                    </li>
                    <li>
                      <strong className={styles['content-title']}>
                        {t('text_more_tenant_guide_is_a')}
                      </strong>
                      <p>{t('text_more_tenant_guide_is_a_ansp1')}</p>
                    </li>
                  </ul>
                  <p>{t('text_more_tenant_guide_is_a_ansp2')}</p>
                  <p>{t('text_more_tenant_guide_is_a_ansp3')}</p>
                </div>
                <div className={styles['slot-main']}>
                  <h2>{t('text_more_tenant_guide_payment')}</h2>
                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_guide_how_much')}
                  </strong>
                  <p>{t('text_more_tenant_guide_how_much_ans')}</p>
                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_guide_who_do')}
                  </strong>
                  <p>{t('text_more_tenant_guide_who_do_ans')}</p>
                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_guide_you_click')}
                  </strong>
                  <p>
                    {t('text_more_tenant_guide_you_click_ans1')}
                    <br />
                    {t('text_more_tenant_guide_you_click_ans2')}
                    <br />
                    {t('text_more_tenant_guide_you_click_ans3')}
                  </p>
                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_guide_how_much_do')}
                  </strong>
                  <p>
                    {t('text_more_tenant_guide_how_much_do_ans1')}
                    <br />
                    {t('text_more_tenant_guide_how_much_do_ans2')}
                    <br />
                    {t('text_more_tenant_guide_how_much_do_ans3')}
                  </p>
                  <p>
                    <em> {t('text_more_tenant_guide_how_much_do_ans4')}</em>
                  </p>
                  <p>{t('text_more_tenant_guide_how_much_do_ans5')}</p>
                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_guide_will_you_notify')}
                  </strong>
                  <p>{t('text_more_tenant_guide_will_you_notify_ans')}</p>
                </div>
                <div className={styles['slot-main']}>
                  <h2>{t('text_more_tenant_guide_tenancy')}</h2>
                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_guide_how_do_i')}
                  </strong>
                  <p>
                    {t('text_more_tenant_guide_how_do_i_ans')}
                    <a href='https://sign.speedrent.com/login' target='_blank'>
                      Click Here
                    </a>
                    .
                  </p>
                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_With_zero')}
                  </strong>
                  <p>{t('text_more_tenant_guide_if_you')}</p>
                  <ul className='feature-main'>
                    <li>{t('text_more_tenant_guide_With_zero_p1')}</li>
                    <li>{t('text_more_tenant_guide_With_zero_p2')}</li>
                    <li>{t('text_more_tenant_guide_With_zero_p3')}</li>
                  </ul>

                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_guide_what_happens')}
                  </strong>
                  <p>{t('text_more_tenant_guide_there_are')}</p>

                  <ol className='general-custom-counter'>
                    <li>{t('text_more_tenant_guide_what_happens_p1')}</li>
                    <li>
                      {t('text_more_tenant_guide_what_happens_p2')}.<br />
                      {t('text_more_tenant_guide_when_you_sub')}
                      <ul className='general-check-list'>
                        <li>{t('text_more_tenant_guide_when_you_p1')}</li>
                        <li>{t('text_more_tenant_guide_when_you_p2')}</li>
                      </ul>
                    </li>
                  </ol>
                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_guide_what_are')}
                  </strong>
                  <p>
                    - {t('text_more_tenant_guide_what_are_p1')}
                    <br />- {t('text_more_tenant_guide_what_are_p2')}
                    <br />- {t('text_more_tenant_guide_what_are_p3')}
                  </p>
                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_guide_what_does')}
                  </strong>
                  <p>{t('text_more_tenant_guide_what_does_ans')}</p>

                  <ul className='feature-main'>
                    <li>{t('text_more_tenant_guide_what_does_p1')}</li>
                    <li>{t('text_more_tenant_guide_what_does_p2')}</li>
                    <li>{t('text_more_tenant_guide_what_does_p3')}</li>
                  </ul>
                  <p>{t('text_more_tenant_guide_if_you_are')}</p>
                  <ul className='feature-main'>
                    <li>{t('text_more_tenant_guide_what_does_p4')}</li>
                    <li>{t('text_more_tenant_guide_what_does_p5')}</li>
                    <li>{t('text_more_tenant_guide_what_does_p6')}</li>
                    <li>{t('text_more_tenant_guide_what_does_p7')}</li>
                  </ul>
                </div>
                <div className={styles['slot-main']}>
                  <h2>{t('text_more_tenant_guide_room')}</h2>
                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_guide_what_happens_q1')}
                  </strong>
                  <p>{t('text_more_tenant_guide_what_happens_ans')}</p>
                  <strong className={styles['content-title']}>
                    {t('text_more_tenant_guide_are_there_q1')}
                  </strong>
                  <p>{t('text_more_tenant_guide_what_are_ans')}</p>
                  <ul className={styles['feature-content-list']}>
                    <li>
                      <div className={styles['img']}>
                        <img
                          loading='lazy'
                          src='/img/icons/cooking.svg'
                          width={42}
                          alt='images'
                        />
                      </div>
                      <div className='txt'>
                        <strong className={styles['content-title']}>
                          {t('text_more_tenant_guide_kitchen')}
                        </strong>
                        <p>{t('text_more_tenant_guide_kitchen_ans')}</p>
                      </div>
                    </li>
                    <li>
                      <div className={styles['img']}>
                        <img
                          loading='lazy'
                          src='/img/icons/protected-02.svg'
                          width={24}
                          alt='images'
                        />
                      </div>
                      <div className='txt'>
                        <strong className={styles['content-title']}>
                          {t('text_more_tenant_guide_cleaning')}
                        </strong>
                        <p>{t('text_more_tenant_guide_cleaning_ans')}</p>
                      </div>
                    </li>
                    <li>
                      <div className={styles['img']}>
                        <img
                          loading='lazy'
                          src='/img/icons/brush.svg'
                          width={42}
                          alt='images'
                        />
                      </div>
                      <div className='txt'>
                        <strong className={styles['content-title']}>
                          {t('text_more_tenant_guide_common')}
                        </strong>
                        <p>{t('text_more_tenant_guide_common_ans')}</p>
                      </div>
                    </li>
                    <li>
                      <div className={styles['img']}>
                        <img
                          loading='lazy'
                          src='/img/icons/dog.svg'
                          width={42}
                          alt='images'
                        />
                      </div>
                      <div className='txt'>
                        <strong className={styles['content-title']}>
                          {t('text_more_tenant_guide_pets')}
                        </strong>
                        <p>{t('text_more_tenant_guide_pets_ans')}</p>
                      </div>
                    </li>
                    <li>
                      <div className={styles['img']}>
                        <img
                          loading='lazy'
                          src='/img/icons/helping.svg'
                          width={42}
                          alt='images'
                        />
                      </div>
                      <div className='txt'>
                        <strong className={styles['content-title']}>
                          {t('text_more_tenant_guide_conflict')}
                        </strong>
                        <p>{t('text_more_tenant_guide_conflict_ans')}</p>
                      </div>
                    </li>
                    <li>
                      <div className={styles['img']}>
                        <img
                          loading='lazy'
                          src='/img/icons/sound.svg'
                          width={41}
                          alt='images'
                        />
                      </div>
                      <div className='txt'>
                        <strong className={styles['content-title']}>
                          {t('text_more_tenant_guide_noise')}
                        </strong>
                        <p>{t('text_more_tenant_guide_noise_ans')}</p>
                      </div>
                    </li>
                    <li>
                      <div className={styles['img']}>
                        <img
                          loading='lazy'
                          src='/img/icons/capsule.svg'
                          width={41}
                          alt='images'
                        />
                      </div>
                      <div className='txt'>
                        <strong className={styles['content-title']}>
                          {t('text_more_tenant_guide_drug')}
                        </strong>
                        <p>{t('text_more_tenant_guide_drug_ans')}</p>
                      </div>
                    </li>
                    <li>
                      <div className={styles['img']}>
                        <img
                          loading='lazy'
                          src='/img/icons/man-woman.svg'
                          width={42}
                          alt='images'
                        />
                      </div>
                      <div className='txt'>
                        <strong className={styles['content-title']}>
                          {t('text_more_tenant_guide_additional')}
                        </strong>
                        <p>{t('text_more_tenant_guide_additional_ans')}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <button
          title='Close (Esc)'
          type='button'
          className='mfp-close'
          style={{
            marginTop: '1rem'
          }}
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </Modal>
  )
}

export default AllInOneGuideModal
