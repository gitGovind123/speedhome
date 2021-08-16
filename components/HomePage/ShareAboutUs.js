import React, { useState, useEffect } from 'react'
import axios from 'axios'
import $ from 'isomorphic-parse'
import dayjs from 'dayjs'
import Image from 'next/image'

import styles from './ShareAboutUs.module.scss'

const myLoader = ({ src }) => {
  return src
}
const ShareAboutUs = props => {
  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    setTimeout(() => {
      axios
        .get('https://speedhome.com/blog/wp-json/wp/v2/posts/')
        .then(posts => posts.data.slice(0, 3))
        .then(posts => {
          return posts.map(post => {
            let postLink = post.guid.rendered
            let title = post.title.rendered
            let pubDate = dayjs(post.date).format('DD/MM/YYYY')
            const body = $(post.content.rendered)
            let img = body.find('img').attr('src') || "https://speedhome.com/blog/wp-content/uploads/2020/03/LOGO-SPEEDHOME_RECTANGULAR.png"
            return { title, pubDate, img, postLink }
          })
        })
        .then(blogs => setBlogPosts(blogs))
        .catch(err => {
          setBlogPosts([])
        })
    }, 2000)
  }, [])

  return (
    <div className={styles['share__root-container']}>
      <h4
        className={`d-flex justify-content-center align-items-center ${styles['share__heading--text']}`}
      >
        Blog
      </h4>
      <div className={`d-flex flex-column flex-sm-row justify-content-around`}>
        {blogPosts.map((data, idx) => (
          <a
            key={idx}
            href={data.postLink}
            target='_blank'
            rel='noreferrer'
            className={`${styles['share__card--context']} d-flex flex-column flex-sm-row justify-content-around`}
          >
            <div className={styles['share__img-container']}>
              <Image
                loader={myLoader}
                src={data.img || '/img/icons/avater-circle.svg'}
                height={screen.width > 768 ? 800 :(screen.width > 580) ? 600 : 200}
                width={screen.width}
              />
            </div>
            <div className={styles['share__title']}>{data.title}</div>
            <div className={styles['share__date']}>{data.pubDate}</div>
          </a>
        ))}
      </div>
      <div
        className={`
        d-flex justify-content-center align-items-center 
             ${styles['share__show-more--container']}
             `}
      >
        <a href='https://speedhome.com/blog/?#' target='_blank'>
          Show More
        </a>
      </div>
    </div>
  )
}
export default React.memo(ShareAboutUs)
