import React from 'react'
import dynamic from 'next/dynamic'

const ProfileComponent = dynamic(() =>
  import('../../../components/dashboard/profile/index')
)

const profilePage = () => {
  return <ProfileComponent />
}

export default profilePage
