import React from 'react'
import { connect } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { withRouter } from 'next/router'
import Filter from '../../../components/Filter'
import Head from '../../../components/Common/Head'
import BreadCrumb from '../../../components/Common/BreadCrumb'
import CONST from '../../../globalutilities/consts'

const TenantNoDeposit = props => {
  const { t } = useTranslation('common')
  return (
    <React.Fragment>
      <Head title={t('more:zero_deposit_payment_title')} />
      <main id='main' className='inner-pages'>
        <BreadCrumb breadCrumb={CONST.moreTenantNodeposit} />
        <Filter
          page={'/more/tenant/no-deposit'}
          queryData={props.router.query}
        />
        <div className='page-main-title user-main-title'>
          <div className='container'>
            <h1>{t('more:zero_deposit_payment_title')}</h1>
          </div>
        </div>
        <div className='static-content'>
          <div className='container'>
            <div className='inner'>
              <div className='slot-main'>
                <h2>{t('more:text_zero_deposit')}</h2>
                <p>{t('more:text_more_tenant_deposit_paragraph1')}</p>
                <div className='note-holder'>
                  <div className='note'>
                    <i className='fas fa-pen-nib' />
                    <strong className='content-title'>
                      {t('more:text_note')} #1:
                    </strong>
                    <p>
                      <em>{t('more:text_more_tenant_notes_paragraph1')}</em>
                    </p>
                  </div>
                </div>
              </div>
              <div className='slot-main'>
                <h2>{t('more:text_payment')}</h2>
                <p> {t('more:text_more_tenant_payment_paragraph1')}</p>
                <p>{t('more:text_more_tenant_payment_paragraph2')}</p>
                <p>
                  <u>{t('more:text_example')}</u> <br />
                  <block>
                    {t('more:text_apartment_b_has_a_rent_of_RM900')}.
                  </block>{' '}
                  <br />
                  <block>{t('more:text_sst_of_tenancy_agree')}</block>
                </p>
                <p />
                <p>{t('more:text_more_tenant_example_paragraph')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

function mapStateToProps (state) {
  return {
    language: state.language
  }
}
export async function getServerSideProps () {
  return {}
}

export default connect(mapStateToProps)(withRouter(TenantNoDeposit))
