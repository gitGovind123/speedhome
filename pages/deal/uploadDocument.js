import React from 'react'
import dynamic from 'next/dynamic'

const UploadDocsComponent = dynamic(() => import('../../components/deals/UploadDocsComponent'))

const UploadDocs = props => {
  return (
    <>
      <UploadDocsComponent {...props} />
    </>
  )
}

export default UploadDocs
