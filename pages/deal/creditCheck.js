import React from 'react'
import dynamic from 'next/dynamic'

const CreditCheckComponent = dynamic(() => import('../../components/deals/CreditCheckComponent'))

const CreditCheck = props => {
  return (
    <>
      <CreditCheckComponent {...props} />
    </>
  )
}

export default CreditCheck
