import React, { useState, useEffect } from 'react'

import useTranslation from 'next-translate/useTranslation'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Review.module.scss'

const PropertyListLocationLink = props => {
  const { locationLink, locationName } = props
  const [showMore, setShowMore] = useState(false)
  const { t } = useTranslation('common')

  const modLocation = locationName.replace(/\s/g, '').toLowerCase()
  useEffect(() => {
    if (modLocation == 'klang' || modLocation == 'cyberjaya') {
      setShowMore(true)
    } else {
      setShowMore(false)
    }
  }, [modLocation])

  if (locationLink) {
    return (
      <Row className='text-left'>
        <Col xs={12} md={12}>
          <span>
            <div className='property_faq_heading'>
              Frequently Asked Questions
            </div>
            {modLocation == 'damansara' ? (
              <details>
                <summary className='property__faq_ques'>
                  {t(`${modLocation}_ques_1`)}
                </summary>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_1`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_2`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_3`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_4`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_5`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_6`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_7`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_8`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_9`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_10`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_11`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_12`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_13`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_14`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_15`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_16`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_17`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_18`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_19`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_20`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_21`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_22`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_23`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_24`)}
                </p>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1_25`)}
                </p>
              </details>
            ) : (
              <details>
                <summary className='property__faq_ques'>
                  {t(`${modLocation}_ques_1`)}
                </summary>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_1`)}
                </p>
              </details>
            )}
            <details>
              <summary className='property__faq_ques'>
                {t(`${modLocation}_ques_2`)}
              </summary>
              <p className='property__faq--ans'>{t(`${modLocation}_ans_2`)}</p>
            </details>
            <details>
              <summary className='property__faq_ques'>
                {t(`${modLocation}_ques_3`)}
              </summary>
              <p className='property__faq--ans'>{t(`${modLocation}_ans_3`)}</p>
            </details>
            <details>
              <summary className='property__faq_ques'>
                {t(`${modLocation}_ques_4`)}
              </summary>
              <p className='property__faq--ans'>{t(`${modLocation}_ans_4`)}</p>
            </details>
            <details>
              <summary className='property__faq_ques'>
                {t(`${modLocation}_ques_5`)}
              </summary>
              <p className='property__faq--ans'>{t(`${modLocation}_ans_5`)}</p>
            </details>
            {showMore && (
              <details>
                <summary className='property__faq_ques'>
                  {t(`${modLocation}_ques_6`)}
                </summary>
                <p className='property__faq--ans'>
                  {t(`${modLocation}_ans_6`)}
                </p>
              </details>
            )}
          </span>
        </Col>
      </Row>
    )
  }

  return null
}

export default PropertyListLocationLink
