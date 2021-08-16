import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'

const Breadcrumb = ({ links }) => {
  if (links.length > 0) {
    return (
      <Container>
        <Row>
          <Col
            md={12}
            style={{
              backgroundColor: '#fff'
            }}
          >
            <ul className='page-breadcrumb'>
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
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Breadcrumb
