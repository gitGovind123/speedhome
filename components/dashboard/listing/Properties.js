import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Col } from 'react-bootstrap'
import { getDashboardProperties } from '../../../actions'
import { listingQuery } from '../../../globalutilities/consts'
import ShareModal from './ShareModal'
import RejectedModal from './RejectedModal'
import Loader from '../../Common/Loader'
import { getPropertyNameLink } from '../../Common/Helper'
import { hasAdds } from '../../../globalutilities/helpers'
import CONST from '../../../globalutilities/consts'
import RetrieveKeyConfirmModal from './RetrieveKeyConfirmModal'
import PropertyListItem from '../../PropertyList/PropertyListItem'

import { withRouter } from 'next/router'

class Properties extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      list: [],
      isDropDownActive: '',
      totalPages: 0,
      totalElements: 0,
      pageable: {},
      share: false,
      isRejectedWarning: false,
      link: '',
      rejectedId: null,
      isRetrieveKeyConfirmModalOpen: false,
      currentPropertyRef: null // SDM: pass this to modal
    }
  }

  componentDidMount () {
    const { initPage } = this.props
    this.getPropertyList(initPage)
  }

  getPropertyList = async query => {
    const { type } = this.props
    const properties = await getDashboardProperties({
      ...query,
      ...listingQuery[type]
    })

    if (properties && properties.content) {
      this.setState(
        {
          list: properties.content || [],
          totalPages: properties.totalPages || 0,
          totalElements: properties.totalElements || 0,
          pageable: { ...properties.pageable, sort: '-dateCreated' } || {},
          isLoading: false
        },
        () => this.onFlagUpdate()
      )
    }
  }

  onChange = event => {
    const { isDropDownActive } = this.state
    const { type } = this.props
    this.setState({
      isDropDownActive:
        isDropDownActive !== `${type}${event.target.id}`
          ? `${type}${event.target.id}`
          : ''
    })
  }

  onPageChange = page => {
    this.setState({
      isLoading: true
    })
    this.setState(
      prevState => ({
        pageable: {
          ...prevState.pageable,
          pageNumber: parseInt(page, 10)
        }
      }),
      () => this.getPropertyList(this.state.pageable)
    )
  }

  copyClipBoard = () => {
    let textArea = document.getElementById('copyToShare')
    textArea.select()
    toast('Link copied', {
      autoClose: CONST.ToastTimeout,
      type: toast.TYPE.SUCCESS
    })
    this.setState({ copySuccess: true })
  }

  onFlagUpdate = () => {
    const { list } = this.state
    const { flag, onListFlagUpdate } = this.props
    onListFlagUpdate(flag, !list.length)
  }

  getPageRange = (num, total) => arr => {
    let from = Math.max(0, num - 2)
    let to = Math.min(total, from + 5)
    return arr.slice(from, to)
  }

  setPagination = () => {
    const { totalPages, pageable } = this.state
    const nums = []
    for (let i = 0; i < totalPages; i++) {
      nums.push(i)
    }
    return (
      <div className='inner' id='active-pagination'>
        {pageable.pageNumber > 0 ? (
          <a
            onClick={() => this.onPageChange(pageable.pageNumber - 1)}
            style={{
              cursor: 'pointer',
              color: '#727272',
              fontWeight: 'bold',
              marginRight: '1rem'
            }}
            className='active-prop-prev'
          >
            &lt;&nbsp;Prev
          </a>
        ) : null}
        {totalPages
          ? this.getPageRange(
              pageable.pageNumber,
              totalPages
            )(nums).map(page => (
              <a
                key={page.toString()}
                className={`active-prop ${
                  pageable.pageNumber === page ? 'current' : ''
                }`}
                style={{
                  cursor: 'pointer',
                  color: '#727272',
                  fontWeight: 'bold',
                  marginRight: '1rem'
                }}
                onClick={() => this.onPageChange(page)}
              >
                {page + 1}
              </a>
            ))
          : null}
        {totalPages > 5 && totalPages - 1 !== pageable.pageNumber ? (
          <a
            onClick={() => this.onPageChange(pageable.pageNumber + 1)}
            style={{
              cursor: 'pointer',
              color: '#727272',
              fontWeight: 'bold',
              marginRight: '1rem'
            }}
            className='active-prop-next'
          >
            Next&nbsp;&gt;
          </a>
        ) : null}
      </div>
    )
  }

  onShare = item => {
    this.setState({
      share: true,
      link:
        `${window.location.origin}${
          hasAdds() ? '/details' : '/ads'
        }/${getPropertyNameLink(item.name)}-${item.ref}` || '',
      isDropDownActive: ''
    })
  }

  onReactivate = item => {
    // alert(item);
    this.setState({
      reactivate: true,
      link: `${item}`,
      isDropDownActive: ''
    })
  }

  onPropertyUpdate = (propertyId, changeTo) => {
    const { type } = this.props
    if (type === 'SUSPENDED') {
      return this.setState({
        isRejectedWarning: true,
        rejectedId: propertyId,
        isDropDownActive: ''
      })
    }

    this.setState({
      isDropDownActive: false
    })
    this.props.onUpdate(propertyId, type, changeTo)
  }

  showRetrieveKeyConfirmModal = (propertyRef, showModal) => {
    this.setState({
      isRetrieveKeyConfirmModalOpen: showModal,
      currentPropertyRef: propertyRef
    })
  }

  render () {
    const { type, router } = this.props
    const {
      list,
      share,
      link,
      isLoading,
      isRejectedWarning,
      totalPages
    } = this.state

    return (
      <div>
        {share && link ? (
          <ShareModal
            isOpen={share}
            link={link}
            copyClipBoard={this.copyClipBoard}
            onClose={() => this.setState({ share: false })}
          />
        ) : null}
        {isRejectedWarning ? (
          <RejectedModal
            isOpen={isRejectedWarning}
            rejectedItem={list.find(it => it.id === this.state.rejectedId)}
            onClose={() => this.setState({ isRejectedWarning: false })}
          />
        ) : null}
        <div className='row pro-row' id='propertyActive'>
          {isLoading ? (
            <Loader />
          ) : list && list.length > 0 ? (
            list.map((item, index) => (
              <Col md={4} key={index}>
                <PropertyListItem
                  data={item}
                  router={router}
                  type={type}
                  showRetrieveKeyConfirmModal={this.showRetrieveKeyConfirmModal}
                  onPropertyUpdate={this.onPropertyUpdate}
                  onShare={this.onShare}
                  itemIndex={index}
                  showRetrieveKeyConfirmModal={this.showRetrieveKeyConfirmModal}
                  onChange={this.onChange}
                ></PropertyListItem>
              </Col>
            ))
          ) : (
            <p>
              You don't have any{' '}
              <span
                style={{
                  textTransform: 'lowercase'
                }}
              >
                {type === 'EXPIRED'
                  ? 'rejected'
                  : type === 'INACTIVE'
                  ? 'archive'
                  : type}
              </span>{' '}
              listing.
            </p>
          )}
        </div>
        {totalPages > 1 ? (
          <div className='btn-wrapper pb-40 text-right'>
            <div className='pagination text-right'>{this.setPagination()}</div>
          </div>
        ) : null}

        <RetrieveKeyConfirmModal
          propertyRefId={this.state.currentPropertyRef}
          show={this.state.isRetrieveKeyConfirmModalOpen}
          onHide={() =>
            this.showRetrieveKeyConfirmModal(
              this.state.currentPropertyRef,
              false
            )
          }
        />
      </div>
    )
  }
}

export default withRouter(Properties)
