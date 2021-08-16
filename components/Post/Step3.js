import React, { Component } from 'react'
import Router from 'next/router'

import { FURNISHIN_EXTRA_OPTIONS, FACILITIES_EXTRA_OPTIONS } from './DB'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../actions/post'
import { createReferral } from '../../actions'
import { getDataFromValue } from '../Common/Helper'
import dayjs from 'dayjs'
import {
  dengageConvertedDate,
  triggerDengageEvents,
  triggerGTAG
} from '../../utils/utils'
import Step3Form from './Step3Form'
import Cookies from 'js-cookie'

class Step3 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstStepData: props.firstStep,
      furnishingData: [],
      facilitiesData: [],
      desciptionData: '',
      acceptAllRace: true,
      getPetFriendly: false,
      getBumiLot: false,
      openAvailabilityCalender: false,
      availabilityDate: '',
      availabilityError: false,
      allowWhatsappAutomation: false,
      isEdit: false,
      minDateError: false,
      loading: false
    }
  }

  componentDidMount () {
    if (window) {
      window.scrollTo({
        top: 0
      })
    }

    if (this.props.propertyData) {
      const {
        furnishes,
        facilities,
        description,
        allRaces,
        petFriendly,
        availability,
        bumiLot,
        ref
      } = this.props.propertyData

      const furnishingData = []
      const facilitiesData = []
      if (furnishes) {
        furnishes.map(res => {
          const filterFurnishData = FURNISHIN_EXTRA_OPTIONS.filter(
            furnishData => {
              return furnishData.value === res
            }
          )
          if (filterFurnishData && filterFurnishData.length > 0) {
            furnishingData.push(
              getDataFromValue(
                FURNISHIN_EXTRA_OPTIONS,
                filterFurnishData[0].value
              )
            )
          }
        })
      }

      if (facilities) {
        facilities.map(res => {
          const filterFacilitiesData = FACILITIES_EXTRA_OPTIONS.filter(
            facilitieData => facilitieData.value === res
          )
          if (filterFacilitiesData && filterFacilitiesData.length > 0) {
            facilitiesData.push(
              getDataFromValue(
                FACILITIES_EXTRA_OPTIONS,
                filterFacilitiesData[0].value
              )
            )
          }
        })
      }
      const url = window.location.href

      this.setState({
        firstStepData: this.props.propertyData,
        furnishingData: furnishingData,
        facilitiesData: facilitiesData,
        desciptionData: description,
        acceptAllRace: allRaces,
        getPetFriendly: petFriendly,
        getBumiLot: bumiLot || false,
        availabilityDate: url.includes(ref) ? availability : null,
        isEdit: !!url.includes(ref)
      })
    } else {
      this.setState({
        firstStepData: this.props.firstStep,
        desciptionData:
          (this.props.firstStep && this.props.firstStep.description) || ''
      })
    }
  }

  changeFurnishingHandler = data => {
    if (this.availabilityCheck(this.state.furnishingData, data)) {
      this.setState({
        furnishingData: this.state.furnishingData.filter(
          x => x.value !== data.value
        )
      })
    } else {
      this.setState({
        furnishingData: [...this.state.furnishingData, data]
      })
    }
  }

  changeFacilitiesHandler = data => {
    if (this.availabilityCheck(this.state.facilitiesData, data)) {
      this.setState({
        facilitiesData: this.state.facilitiesData.filter(
          x => x.value !== data.value
        )
      })
    } else {
      this.setState({
        facilitiesData: [...this.state.facilitiesData, data]
      })
    }
  }

  changeAllRaceHandle = () => {
    this.setState({
      acceptAllRace: !this.state.acceptAllRace
    })
  }

  changeBumiLotHandle = () => {
    this.setState({
      getBumiLot: !this.state.getBumiLot
    })
  }

  changePetFriendlyHandle = () => {
    this.setState({
      getPetFriendly: !this.state.getPetFriendly
    })
  }

  whatsAppAutomation = () => {
    this.setState({
      allowWhatsappAutomation: !this.state.allowWhatsappAutomation
    })
  }
  handleAvailabilityDate = date => {
    this.setState({
      availabilityDate: date,
      availabilityError: false
    })
  }

  availabilityCheck = (allData, item) => {
    const index = allData.indexOf(item)
    if (index >= 0) {
      return true
    }
    return false
  }

  setOpenAvailabilityCalender = val => {
    this.setState({
      openAvailabilityCalender: val
    })
  }

  triggerStep3GTAG = () => {
    triggerGTAG({
      event: 'PostListing_ALL'
    })
    triggerGTAG({
      event: 'clickCreateListingStep3'
    })
    triggerGTAG({
      event: 'publish_property'
    })

    triggerDengageEvents('speed_rent_post_property', {
      event_name: 'complete_pp_3',
      name: this.props.user ? this.props.user.name : '',
      phone_number:
        this.props.user && this.props.user.phoneNumber
          ? this.props.user.phoneNumber
          : '',
      email_address:
        this.props.user && this.props.user.email ? this.props.user.email : '',
      date: dengageConvertedDate(),
      property_furnishing: this.props.propertyData?.furnishes.join(','),
      property_value: this.props.propertyData?.price,
      area_of_property: this.props.propertyData?.address
    })
  }

  sendFinalStepData = () => {
    const furnishingValueData = this.state.furnishingData.map(res => res.value)
    const facilitiesValueData = this.state.facilitiesData.map(res => res.value)

    const data = {
      furnishes: furnishingValueData,
      facilities: facilitiesValueData,
      availability: this.state.availabilityDate,
      allRaces: this.state.acceptAllRace,
      petFriendly: this.state.getPetFriendly,
      bumiLot: this.state.getBumiLot,
      description: this.state.desciptionData,
      allowWhatsappAutomation: this.state.allowWhatsappAutomation
    }
    if (!this.state.availabilityDate) {
      this.setState({
        availabilityError: true
      })
    } else {
      if (dayjs(this.state.availabilityDate).isBefore(dayjs(), 'day')) {
        this.setState({
          minDateError: true
        })
      } else {
        this.setState({
          loading: true,
          minDateError: false
        })
        const propertyId = this.state.firstStepData.id
        const { ref, landmarkLabelVerified, type } = this.state.firstStepData

        if (propertyId) {
          this.props.postActions.updatePost(propertyId, data).then(res => {
            if (res.payload) {
              const url = window.location.href

              if (url.includes('edit')) {
                // editing listing goes to gps
                if (
                  (type === 'HIGHRISE' || type === 'HIGHRISE_SALE') &&
                  landmarkLabelVerified
                ) {
                  Router.push('/dashboard/listings')
                } else {
                  Router.push(`/post/gps/${ref}?edit=true`)
                }
              } else {
                this.triggerStep3GTAG()
                if (type === 'HIGHRISE' && landmarkLabelVerified) {
                  Router.push({
                    pathname: `/post/homerunner/${ref}`,
                    query: {
                      activeSteps: this.props.activeSteps,
                      currentStep: 'Key Collection',
                      nextStep: `What's Next`,
                      totalSteps: this.props.totalSteps
                    }
                  })
                } else if (type === 'HIGHRISE_SALE' && landmarkLabelVerified) {
                  Router.push(`/post/post-for-rent/${ref}`)
                } else {
                  Router.push({
                    pathname: `/post/gps/${ref}`,
                    query: {
                      activeSteps: this.props.activeSteps,
                      currentStep: 'Confirm GPS Coordinate',
                      nextStep:
                        type === 'HIGHRISE' || type === 'LANDED'
                          ? 'Key Collection'
                          : type === 'HIGHRISE_SALE' || type === 'LANDED_SALE'
                          ? 'Post for rent'
                          : `What's Next`,
                      totalSteps: this.props.totalSteps
                    }
                  })
                }
              }
              let rrid = Cookies.get('rrid')
              let ajReferralCode = Cookies.get('ajreferral')
              if (rrid) {
                let payload = {
                  source: rrid,
                  referralCode: ajReferralCode
                }
                createReferral(payload)
              }
            } else {
              if (window) {
                window.scrollTo({
                  top: 0
                })
              }
              alert('Something went wrong')
              this.setState({
                loading: false
              })
            }
          })
        }
      }
    }
    this.props.submitExtraInformation()
  }
  setDesciptionData = data => {
    this.setState({
      desciptionData: data
    })
  }

  desciptionDataOnChange = () => {
    this.setState({
      desciptionData: e.target.value
    })
  }
  render () {
    const {
      desciptionData,
      firstStepData,
      furnishingData,
      facilitiesData,
      acceptAllRace,
      getPetFriendly,
      getBumiLot,
      availabilityError,
      minDateError
    } = this.state
    const desciptionWords = desciptionData.split(' ').filter(item => item)

    const descriptionStrength =
      desciptionWords.length <= 29
        ? 'weak'
        : desciptionWords.length <= 69
        ? 'medium'
        : desciptionWords.length >= 70
        ? 'strong'
        : ''

    return (
      <Step3Form
        styles={this.props.styles}
        selectTedPostType={this.props.selectTedPostType}
        photoUploadSuccess={this.props.photoUploadSuccess}
        availabilityDate={this.state.availabilityDate}
        loading={this.state.loading}
        firstStepData={firstStepData}
        furnishingData={furnishingData}
        facilitiesData={facilitiesData}
        acceptAllRace={acceptAllRace}
        getPetFriendly={getPetFriendly}
        getBumiLot={getBumiLot}
        availabilityError={availabilityError}
        minDateError={minDateError}
        desciptionData={desciptionData}
        setDesciptionData={this.setDesciptionData}
        descriptionStrength={descriptionStrength}
        sendFinalStepData={this.sendFinalStepData}
        availabilityCheck={this.availabilityCheck}
        changeFurnishingHandler={this.changeFurnishingHandler}
        changeFacilitiesHandler={this.changeFacilitiesHandler}
        changeAllRaceHandle={this.changeAllRaceHandle}
        changePetFriendlyHandle={this.changePetFriendlyHandle}
        changeBumiLotHandle={this.changeBumiLotHandle}
        handleAvailabilityDate={this.handleAvailabilityDate}
        desciptionDataOnChange={this.desciptionDataOnChange}
        isEdit={this.state.isEdit}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postActions: bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step3)
