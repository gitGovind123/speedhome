import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'

import Head from '../../../components/Common/Head'
import BlogRef from './ref/index'
import Learn from './../index'

const Blog = () => {
  return (
    <div>
      <Head
        title='Learn | SPEEDHOME'
      />
      <Learn>
        <BlogRef/>
      </Learn>
    </div>
  )
}

export default Blog
