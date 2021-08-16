import React from 'react'

import Learn from '../index'
import Head from '../../../components/Common/Head'
import EventRef from './ref/index'

const Event = () => {
  return (
    <div>
      <Head
        title='Learn | SPEEDHOME'
      />
      <Learn>
        <EventRef/>
      </Learn>
    </div>
  )
}
export default Event
