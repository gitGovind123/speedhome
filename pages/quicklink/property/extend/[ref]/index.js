import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Col, Row } from 'react-bootstrap'
import Loader from '../../../../../components/Common/Loader'
import BreadCrumb from '../../../../../components/Common/BreadCrumb'
import CONST from '../../../../../globalutilities/consts'
import Head from '../../../../../components/Common/Head'
import { extendedPropertyListingExpirary } from '../../../../../actions/property'
import styles from './quicklink.module.scss'

const QuicklinkComponent = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (router && router.query && router.query.ref && router.query.token) {
      extendedPropertyListingExpirary(
        router.query.ref,
        router.query.token
      ).then(res => {
        if (res && res.success === true) {
          setIsLoading(false)
        } else {
          setLoadError(true)
          setIsLoading(false)
        }
      })
    } else {
      setLoadError(true)
      setIsLoading(false)
    }
  }, [router])

  return (
    <>
      <Head title='Quicklink'></Head>

      <section className={styles['section-quicklink']}>
        <BreadCrumb breadCrumb={CONST.quicklink} />

        <Container>
          <Row>
            <Col md={12}>
              <div className={styles['quicklink__main']}>
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {loadError ? (
                      <p>Something went wrong!, Try again later.</p>
                    ) : (
                      <>
                        <div className={styles['quicklink__main--desc']}>
                          <h3>
                            Your property will be <br></br> live for another 30
                            days.
                          </h3>
                          <p>For assistance feel free to talk to Alicia</p>
                        </div>
                        <div className={styles['quicklink__main--img']}>
                          <img src={'/img/quicklink.png'} alt='quicklink img' />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default QuicklinkComponent
