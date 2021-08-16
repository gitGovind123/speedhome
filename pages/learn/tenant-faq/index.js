import React from 'react'

import Head from '../../../components/Common/Head'
import Learn from '../index'
import TenantFaqRef from './ref/index'


const TenantFaq = props => {
  return (
    <div>
      <Head
        title='Learn | SPEEDHOME'
        rel='canonical'
        hrf='https://speedhome.com/learn/tenant-faq'
      />
      <Learn>
        <TenantFaqRef/>
      </Learn>
    </div>
  )
}
export default TenantFaq

