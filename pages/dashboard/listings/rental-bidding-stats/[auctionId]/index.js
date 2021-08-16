import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import Head from '../../../../../components/Common/Head'
import * as auctionActions from '../../../../../actions/auctionActions'
import { Container, Row, Table, Col, Alert, Button } from 'react-bootstrap'
import styles from './auctionStats.module.scss'

const AuctionStatsComponent = props => {
  const [bidData, setBidData] = useState(null)
  const [auctionData, setAuctionData] = useState(null)
  const [currentBidChat, setCurrentBidChat] = useState('')

  useEffect(() => {
    if (props.router.query.auctionId) {
      const auctionId = props.router.query.auctionId
      auctionActions.getPropertyAuction(auctionId).then(res => {
        if (res) {
          setAuctionData(res)
        }
      })
      auctionActions.getPropertyStatsTenantList(auctionId).then(res => {
        if (res) {
          setBidData(res)
        }
      })
    }
  }, [props.router])

  const submitChatForBid = bidId => {
    auctionActions.submitCrForBids(bidId).then(res => {
      setCurrentBidChat(bidId)
    })
  }

  return (
    <section className={styles['auction-stats--container']}>
      <Head title='Auction Stats || SPEEDHOME'></Head>
      <Container>
        <Row>
          <Col md={12}>
            <div className={styles['auction--propertyInfo']}>
              <h2>Bidding Stats</h2>
              <h4>Property Name: {auctionData && auctionData.property.name}</h4>
              <div className={styles['bidding--info']}>
                <span>
                  <b>Current Bid: </b> RM{' '}
                  {auctionData && auctionData.currentPrice}
                </span>
                <span>
                  <b>Starting Bid: </b>
                  RM {auctionData && auctionData.startPrice}
                </span>
                <span>
                  <b>Total Bids: {bidData && bidData.length}</b>
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className={styles['auction--tenant-list']}>
              <h4>Bids by people</h4>
              {bidData && bidData.length > 0 ? (
                <Table striped bordered hover responsive size='sm'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      {/* <th>Moving Date</th> */}
                      {/* <th>Occupation</th> */}
                      <th>Bid price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bidData.map(bids => {
                      return (
                        <tr>
                          <td>{bids.user && bids.user.name}</td>
                          <td>{bids.fromCountry && bids.fromCountry}</td>
                          {/* <td>
                            {bids.movingDate &&
                              moment(bids.movingDate).format('MMM Do, YYYY')}
                          </td>
                          <td>{bids.occupation && bids.occupation}</td> */}
                          <td>RM {bids.price && bids.price}</td>
                          <td>
                            <Button
                              className={`${styles['submitBidCrBtn']} ${
                                currentBidChat == bids.id
                                  ? styles['submitBidCrBtnSuccess']
                                  : ''
                              } `}
                              onClick={() => {
                                if (currentBidChat == bids.id) {
                                  props.router.push('/dashboard/chat')
                                } else {
                                  submitChatForBid(bids.id)
                                }
                              }}
                            >
                              {currentBidChat == bids.id
                                ? 'Go To Chat'
                                : 'Submit Chat Request'}
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              ) : (
                <Alert variant='secondary'>No stats found</Alert>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default withRouter(AuctionStatsComponent)
