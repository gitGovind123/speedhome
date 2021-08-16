import React from 'react'
import PageNotFound from '../components/Common/PageNotFound'

class Error extends React.Component {
  static async getInitialProps ({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }

  render () {
    return <PageNotFound />
  }
}

export default Error
