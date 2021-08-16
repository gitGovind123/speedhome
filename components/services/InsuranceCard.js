import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Card } from 'react-bootstrap'

const InsuranceCard = ({ styles }) => {
  const { t } = useTranslation('common')

  return (
    <div>
      <div className={styles['insurance-card__head']}>
        {t('service:insurance_card_head')}
      </div>
      <div className={styles['card__first--container']}>
        <div className={styles['mattress__cards--container']}>
          <div className={styles['cards__subhead']}>Mattress</div>
          <div className={styles['mattress__cards']}>
            <Card style={{ width: '15rem', border: 'none' }}>
              <Card.Img
                id='claim_card-img'
                variant='top'
                src='/img/mattressone.jpg'
              />
              <Card.Body>
                <Card.Title>
                  {t('service:insurance_claiming_approve')}
                </Card.Title>
                <Card.Text>
                  <p id='claim-card_text'>
                    {t('service:insurance_approve_mattress1')}
                  </p>
                  <p id='claim-card_text'>
                    {t('service:insurance_approve_mattress2')}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '15rem', border: 'none' }} id='cards'>
              <Card.Img
                id='claim_card-img'
                variant='top'
                src='/img/mattresstwo.jpg'
              />
              <Card.Body>
                <Card.Title>
                  {t('service:insurance_claiming_approve_partial')}
                </Card.Title>
                <Card.Text>
                  <p id='claim-card_text'>
                    {t('service:insurance_partial_mattress1')}
                  </p>
                  <p id='claim-card_text'>
                    {t('service:insurance_partial_mattress2')}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className={styles['wardrove__cards--container']}>
          <div className={styles['cards__subhead']}>Wardrobe</div>
          <div className={styles['wardrobe__cards']}>
            <Card style={{ width: '15rem', border: 'none' }}>
              <Card.Img
                id='claim_card-img'
                variant='top'
                src='/img/wardrobeone.jpg'
              />
              <Card.Body>
                <Card.Title>
                  {t('service:insurance_claiming_approve')}
                </Card.Title>
                <Card.Text>
                  <p id='claim-card_text'>
                    {t('service:insurance_approve_wardrobe1')}
                  </p>
                  <p id='claim-card_text'>
                    {t('service:insurance_approve_wardrobe2')}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '15rem', border: 'none' }} id='cards'>
              <Card.Img
                id='claim_card-img'
                variant='top'
                src='/img/wardrobetwo.jpg'
              />
              <Card.Body>
                <Card.Title>
                  {t('service:insurance_claiming_approve_partial')}
                </Card.Title>
                <Card.Text>
                  <p id='claim-card_text'>
                    {t('service:insurance_partial_wardrobe1')}
                  </p>
                  <p id='claim-card_text'>
                    {t('service:insurance_partial_wardrobe2')}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <div className={styles['card__second--container']}>
        <div className={styles['sofa__cards--container']}>
          <div className={styles['cards__subhead']}>Sofa</div>
          <div className={styles['sofa__cards']}>
            <Card style={{ width: '15rem', border: 'none' }}>
              <Card.Img
                id='claim_card-img'
                variant='top'
                src='/img/sofaone.jpg'
              />
              <Card.Body>
                <Card.Title>
                  {t('service:insurance_claiming_approve')}
                </Card.Title>
                <Card.Text>
                  <p id='claim-card_text'>
                    {t('service:insurance_approve_sofa1')}
                  </p>
                  <p id='claim-card_text'>
                    {t('service:insurance_approve_sofa2')}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '15rem', border: 'none' }} id='cards'>
              <Card.Img
                id='claim_card-img'
                variant='top'
                src='/img/sofatwo.jpg'
              />
              <Card.Body>
                <Card.Title>
                  {t('service:insurance_claiming_approve_partial')}
                </Card.Title>
                <Card.Text>
                  <p id='claim-card_text'>
                    {t('service:insurance_partial_sofa1')}
                  </p>
                  <p id='claim-card_text'>
                    {t('service:insurance_partial_sofa2')}
                  </p>
                  <p id='claim-card_text'>
                    {t('service:insurance_partial_sofa3')}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className={styles['wall__cards--container']}>
          <div className={styles['cards__subhead']}>Wall</div>
          <div className={styles['wall__cards']}>
            <Card style={{ width: '15rem', border: 'none' }}>
              <Card.Img
                id='claim_card-img'
                variant='top'
                src='/img/wallone.jpg'
              />
              <Card.Body>
                <Card.Title>
                  {t('service:insurance_claiming_approve')}
                </Card.Title>
                <Card.Text>
                  <p id='claim-card_text'>
                    {t('service:insurance_approve_wall1')}
                  </p>
                  <p id='claim-card_text'>
                    {t('service:insurance_approve_wall2')}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '15rem', border: 'none' }} id='cards'>
              <Card.Img
                id='claim_card-img'
                variant='top'
                src='/img/walltwo.jpg'
              />
              <Card.Body>
                <Card.Title>
                  {t('service:insurance_claiming_notapprove')}
                </Card.Title>
                <Card.Text>
                  <p id='claim-card_text'>
                    {t('service:insurance_partial_wall1')}
                  </p>
                  <p id='claim-card_text'>
                    {t('service:insurance_partial_wall2')}
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsuranceCard
