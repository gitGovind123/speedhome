import React, { useEffect } from 'react'
import { sendSearchTrackingActionLog } from '../../utils/utils'

const PageViewCountForSearchTracking = props => {
  const { propertyRef, routerQuery } = props
  useEffect(() => {
    sendSearchTrackingActionLog('entry', propertyRef, routerQuery)
  }, [])
  return <></>
}

export default PageViewCountForSearchTracking
