import React from 'react'
import { withRouter } from 'next/router'

import Learn from '../index'
import Head from '../../../components/Common/Head'
import LandlordFaqRef from './ref/index'

const LandlordFaq = props => {
  return (
    <div>
      <Head
        title='Learn | SPEEDHOME'
      />
      <Learn>
        <LandlordFaqRef/>
      </Learn>
    </div>
  )
}
export default LandlordFaq
