import React from 'react'
import useTranslation from 'next-translate/useTranslation'

import { triggerGTAG } from '../../utils/utils'
import Review from '../Common/Review'
import Image from 'next/image'

const SELECTED_POST_TYPE = ['rent', 'sale']

const SelectPostType = props => {
  const { setSelectTedPostType, setInitialLoad, styles } = props
  const { t } = useTranslation('common')
  return (
    <>
      <div className={styles['post__property--select--container']}>
        <div className={styles['post__property--select']}>
          <div
            id='btnClickPropertyForRent'
            className={styles['post__property--box']}
            onClick={() => {
              setSelectTedPostType(SELECTED_POST_TYPE[0])
              setInitialLoad(false)
              triggerGTAG({
                event: 'clickPropertyForRent'
              })
            }}
          >
            <Image
              id='imgClickPropertyForRent'
              loading='lazy'
              src='/img/want-to-rent.png'
              width={100}
              height={100}
            />
            <strong>
              <small>{t('post:i_want_rent')}</small>
            </strong>
          </div>
          <div
            id='btnClickPropertyForSale'
            className={styles['post__property--box']}
            onClick={() => {
              setSelectTedPostType(SELECTED_POST_TYPE[1])
              setInitialLoad(false)
              triggerGTAG({
                event: 'clickPropertyForSale'
              })
            }}
          >
            <Image
              id='imgClickPropertyForSale'
              loading='lazy'
              src='/img/sell.png'
              width={100}
              height={100}
            />
            <strong>
              <small>{t('post:i_want_sell')}</small>
            </strong>
          </div>
        </div>
        <div className={styles['post__property--select__protips']}>
          <img src='/img/idea-img.png' />
          <span>
            You want us to help you upload your listing for FREE? Send us the
            pictures of your property and description via WhatsApp: +6018 7777
            650 OR email:{' '}
            <a href='mailto:hello@speedhome.com' target='_top'>
              hello@speedhome.com
            </a>
          </span>
          <br></br> <br />
          <span>
            Pro-tip to rent out faster: Send us a video of your listing!
          </span>
        </div>
      </div>
      <Review />
      <div>
        <div className={'property_faq_heading'}>Frequently Asked Questions</div>
        <details>
          <summary className={'property__faq_ques'}>
            {t('post:post_ques_1')}
          </summary>
          <p className={'property__faq--ans'}>{t('post:post_ans_1')}</p>
        </details>
        <details>
          <summary className={'property__faq_ques'}>
            {t('post:post_ques_2')}
          </summary>
          <p className={'property__faq--ans'}>{t('post:post_ans_2')}</p>
        </details>
        <details>
          <summary className={'property__faq_ques'}>
            {t('post:post_ques_3')}
          </summary>
          <p className={'property__faq--ans'}>{t('post:post_ans_3')}</p>
        </details>
        <details>
          <summary className={'property__faq_ques'}>
            {t('post:post_ques_4')}
          </summary>
          <p className={'property__faq--ans'}>
            <span
              dangerouslySetInnerHTML={{
                __html: t('post:post_ans_4', {
                  interpolation: { escapeValue: false }
                })
              }}
            />
          </p>
        </details>
        <details>
          <summary className={'property__faq_ques'}>
            {t('post:post_ques_5')}
          </summary>
          <p className={'property__faq--ans'}>{t('post:post_ans_5')}</p>
        </details>
        <details>
          <summary className={'property__faq_ques'}>
            {t('post:post_ques_6')}
          </summary>
          <p className={'property__faq--ans'}>{t('post:post_ans_6')}</p>
        </details>
      </div>
    </>
  )
}

export default SelectPostType
