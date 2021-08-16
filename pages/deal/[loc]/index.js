import React from 'react'
import dynamic from 'next/dynamic'
import BreadCrumbDyn from '../../../components/Common/BreadCrumbDyn'
const Deal = dynamic(() => import('../../../components/deals'))

const DealLoc = ({ toVerifyBooking, hash }) => {
  return (
    <>
      <BreadCrumbDyn />
      <Deal toVerifyBooking={toVerifyBooking} hash={hash} />
    </>
  )
}

export async function getServerSideProps (context) {
  const { query } = context

  let toVerifyBooking = false
  let hash = ''

  if (query && query.loc) {
    if (query.loc && query.loc.lastIndexOf('-') != -1) {
      hash = query.loc.substring(0, query.loc.lastIndexOf('-'))
      toVerifyBooking = true
    } else {
      hash = query.loc
    }
  }

  return {
    props: {
      toVerifyBooking: toVerifyBooking,
      hash: hash
    }
  }
}

export default DealLoc
