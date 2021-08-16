import React from 'react'
import { useRouter } from 'next/router'
import { getHomeOwnershipListAPI } from '../../api/homeOwnership'
import Head from '../../components/Common/Head'

import HomeOwnerShip from '../../components/home-ownership/HomeOwnerShip'
import HomeOwnershipDetails from '../../components/home-ownership/HomeOwnerShipDetails'

const HomeOwnerShipPage = props => {
  const { homeOwnershipList } = props
  const router = useRouter()

  return (
    <>
      <Head
        title='Invest in Property / Upgrade Buy New Property in Malaysia SPEEDHOME'
        description='SPEEDHOME for House for Rent, You Can Compare Our Performance vs Real Estate Agents like DF Realty Sdn Bhd, Maxxan Realty Sdn Bhd, Vivahomes Realty Sdn Bhd'
      />
      {!router.query.id ? (
        <HomeOwnerShip homeOwnershipList={homeOwnershipList} />
      ) : (
        <HomeOwnershipDetails homeOwnershipList={homeOwnershipList} />
      )}
    </>
  )
}

export async function getServerSideProps () {
  const result = await getHomeOwnershipListAPI()
  return {
    props: {
      homeOwnershipList: result
    }
  }
}

export default HomeOwnerShipPage
