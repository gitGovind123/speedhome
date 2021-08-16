import React from 'react'
import Link from 'next/link'

const Breadcrumb = ({ links, styles }) => {
  if (links.length > 0) {
    return (
      <div>
        <ul className={`page-breadcrumb ${styles['listing-breadcrumb']}`}>
          {links.map(link => {
            if (link.url && link.url.length > 0) {
              return (
                <li key={link.id}>
                  <Link href={link.url}>
                    <a>{link.title}</a>
                  </Link>
                </li>
              )
            } else {
              return <li key={link.id}>{link.title}</li>
            }
          })}
        </ul>
      </div>
    )
  }
}

export default Breadcrumb
