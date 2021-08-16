import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import {
    Row,
    Col,
    Container
} from 'react-bootstrap'
import {
    Button
} from '@material-ui/core'

import CONST from '../../globalutilities/consts'
import Head from '../../components/Common/Head'
import BreadCrumb from '../../components/Common/BreadCrumb'
import MessageProgressBar from '../../components/Common/MessageProgressBar'

import 'react-toastify/dist/ReactToastify.css'
import styles from './whatsNext.module.scss'

const WhatsNextComponent = props => {
    const { t } = useTranslation('common')
    const[ isShow, setIsShow]   = useState()

    useEffect(() => {
       if(Router &&
           Router.query &&
           Router.query.isShow)
       setIsShow(true)
    },[])

    const onSubmitWhatsNext = () => {
        Router.push(`/post/lead/${Router.query.ref}`)
    }

    return (
        <section className='post_page_homerunner'>
            { isShow && (
                <MessageProgressBar
                    label={'You have successfully posted your listing.'}
                />
            )}
            <ToastContainer />
            <Head
                title={'Post a Property to Find Tenants | SPEEDHOME'}
                description={
                    'Are you looking for a tenant for your property? Let SPEEDHOME speed up the process of finding the best tenant and make you a landlord. Fill out out the form, takes up only minutes.'
                }
            />
            <BreadCrumb breadCrumb={CONST.whatsNext} />
            <Container>
                <div className={`${styles['whatsnext']}`}>
                    <Row
                        className={`${styles['middle-md']} `}
                    >
                        <Col md={3}/>
                        <Col md={6}>
                            <h4 className={styles['additional-sub-text']}>
                                What's Next?
                            </h4>
                        </Col>
                        <Col md={3} />
                    </Row>
                    <Row
                        className={`${styles['middle-md']} text-center `}
                    >
                        <Col md={3} />
                        <Col md={5}>
                            <div className={`${styles['whatsnext_div']}d-flex v-center`}>
                                <Row className='mt-3'>
                                    <Col xs={1} sm={1} md={1}>
                                        <h5 className={styles['dot']}>1</h5>
                                    </Col>
                                    <Col xs={10} sm={10} md={10} className={styles['text_div']}>
                                        Your property to be approved within 24
                                        hours and will show up in search
                                        results.
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col xs={1} sm={1} md={1}>
                                        <h5 className={styles['dot']}>2</h5>
                                    </Col>
                                    <Col xs={10} sm={10} md={10} className={styles['text_div']}>
                                        You will receive chat request from
                                        interested tenants.
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col xs={1} sm={1} md={1}>
                                        <h5 className={styles['dot']}>3</h5>
                                    </Col>
                                    <Col xs={10} sm={10} md={10} className={styles['text_div']}>
                                        SPEEDHOME specialist will assist in
                                        setting up a viewing appointments with
                                        the tenants.
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col xs={1} sm={1} md={1}>
                                        <h5 className={styles['dot']}>4</h5>
                                    </Col>
                                    <Col xs={10} sm={10} md={10} className={styles['text_div']}>
                                        If the tenant decides to proceed with
                                        renting your unit, our SPEEDHOME
                                        specialist will guide you throughout the
                                        process.
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col xs={1} sm={1} md={1}>
                                        <h5 className={styles['dot']}>5</h5>
                                    </Col>
                                    <Col xs={10} sm={10} md={10} className={styles['text_div']}>
                                        You may look at the sample tenancy
                                        agreement on
                                        www.speedmanage.com.
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col md={4} />
                    </Row>
                    <Row className='mt-4 mb-4'>
                        <Col md={3} />
                        <Col md={5}>
                            <Button
                                className={styles['whatsnext-btn-submit']}
                                type='button'
                                onClick={() => onSubmitWhatsNext()}
                            >
                                Ok, Got It!
                            </Button>
                        </Col>
                        <Col md={4} />
                    </Row>
                </div>
            </Container>
        </section>
    )
}

function mapStateToProps (state) {
    return {
        language: state.language,
    }
}

export default connect(mapStateToProps, null)(WhatsNextComponent)
