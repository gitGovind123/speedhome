import React from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

import Container from 'react-bootstrap/Container'

const BreadCrumb = ({ breadCrumb }) => {
  const { t } = useTranslation('common')
  return (
    <Container>
      <ul className='page-breadcrumb'>
        {breadCrumb.map((crumb, index) => {
          return (
            <li key={index.toString()}>
              {crumb.disabled ? (
                <strong>{t(crumb.label)}</strong>
              ) : (
                <Link href={crumb.localPath} as={crumb.path}>
                  <a>{t(crumb.label)}</a>
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
export default BreadCrumb
