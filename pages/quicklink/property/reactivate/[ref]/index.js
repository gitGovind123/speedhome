import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Col, Row } from 'react-bootstrap'
import Loader from '../../../../../components/Common/Loader'
import BreadCrumb from '../../../../../components/Common/BreadCrumb'
import CONST from '../../../../../globalutilities/consts'
import Head from '../../../../../components/Common/Head'
import {
  getPropertyFromRef,
  reactivateProperty
} from '../../../../../actions/property'
import styles from '../../extend/[ref]/quicklink.module.scss'
import { getDeviceId, getToken } from '../../../../../globalutilities/helpers'
import { AUTH_SERVER } from '../../../../../env'

const QuicklinkComponent = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const router = useRouter()

  const getPropertydetailsFromRef = async ref => {
    const cookies = {
      authToken: getToken() || router.query?.token,
      xDeviceId: getDeviceId()
    }
    if (getToken() || router.query?.token) {
      const property = await getPropertyFromRef(ref, cookies)
      if (property?.id) {
        const response = await reactivateProperty(property.id)
        if (response.status === 200) {
          router.push('/dashboard/listings')
        } else {
          setLoadError(true)
          setIsLoading(false)
        }
      } else {
        setLoadError(true)
        setIsLoading(false)
      }
    } else {
      const currentPath = window.location.href
      const constructUrl = `${AUTH_SERVER}?originType=SH&origin=${currentPath}`
      window.location.href = constructUrl
    }
  }

  useEffect(() => {
    getPropertydetailsFromRef(router.query?.ref)
  }, [])

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
                    ) : null}
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
