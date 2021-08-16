import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Link from 'next/link'
import CloseIcon from '@material-ui/icons/Close'

const Headling = ({ title, link }) => {
  return (
    <Row
      style={{
        margin: '3rem 0'
      }}
    >
      <Col md={12}>
        <div className='page-main-title user-main-title'>
          <div className='titileContainer'>
            <h1>{title}</h1>
            {link ? (
              <Link href={link}>
                <a className='close'>
                  <CloseIcon />
                </a>
              </Link>
            ) : null}
          </div>
        </div>
      </Col>
    </Row>
  )
}
export default Headling
