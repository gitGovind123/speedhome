import React, { useState, useEffect } from 'react'

import { Container } from 'react-bootstrap'
import { ClipLoader } from 'react-spinners'

import dayjs from 'dayjs'
import axios from 'axios'
import $ from 'isomorphic-parse'

import styles from './../../learnIndex.module.scss'


const Blog = (props) => {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('https://speedhome.com/blog/wp-json/wp/v2/posts/')
      .then(posts => posts.data.slice(0, 8))
      .then(posts => {
        return posts.map(post => {
          let postLink = post.guid.rendered
          let title = post.title.rendered
          let categories = post.categories
          let content = post.content.rendered
          let pubDate = dayjs(post.date).format('MMMM DD,YYYY')
          const body = $(post.content.rendered)
          let img = body.find('img').attr('src')
          let p = $(post.content.rendered).text()
          return { title, pubDate, img, postLink, content, categories, p }
        })
      })
      .then(blogs => {
        setBlogPosts(blogs)
        setLoading(false)
      })
      .catch(() => {
        setBlogPosts([])
      })
  }, [])

  return (
    <div>
      <Container>
        {loading ? (
          <div className={styles['blog__loading']}>
            <ClipLoader color='#4885ed' />
          </div>
        ) : (
          <div className={`${styles['blog__container']} row`}>
            {blogPosts.map((data, i) => {
              let title = data.title
              let ending = title.length > 55 ? '...' : ''
              return (
                <div className={`col-sm-3 col-xs-6 ${styles['col-xs-6']}`} key={i}>
                  <a
                    href={data.postLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles['blog-card']}
                  >
                    <img
                      className={styles['blog-card__img']}
                      src={data.img ? data.img : '/img/logo-colored.png'}
                      alt=''
                    />
                    <div className={styles['blog-card__date-category']}>
                      <div className={styles['blog-card__date']}> {data.pubDate}</div>
                      <div className={styles['blog-card__category']}>Category</div>
                    </div>
                    <div className={styles['blog-card__text-root']}>
                      <p className={styles['blog-card__text-question']}>
                        {title.slice(0, 52) + ending}
                      </p>
                      <div className={styles['blog-card__text-details']}>{data.p}</div>
                    </div>
                  </a>
                </div>
              )
            })}
            <a
              className={styles['blog__read-more']}
              href='https://speedhome.com/blog/?#'
              target='_blank'
              rel='noreferrer'
            >
              <button className={`btn yellow-btn ${styles['yellow-btn']}`}>Read more</button>
            </a>
          </div>
        )}
      </Container>
    </div>
  )
}

export default Blog
