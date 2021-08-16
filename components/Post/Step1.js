import React from 'react'
import Swal from 'sweetalert2'
import _ from 'lodash'

import {
  HOUSING_TYPE_OPTIONS,
  BED_ROOM_OPTIONS,
  HIGHRISE_BED_ROOM_OPTIONS,
  LANDED_HIGHRISE_BATH_ROOM_OPTIONS,
  ROOM_BATH_ROOM_OPTIONS,
  PARKING_OPTIONS,
  FURNISHING_OPTIONS,
  ROOM_TYPE_OPTIONS,
  NUMBEROF_PAX_OPTIONS,
  FLOOR_LEVEL_OPTION,
  TITLE_TYPE,
  SALE_TYPE
} from './DB'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as autocompleteActions from '../../actions/autocomplete'
import { getDataFromValue } from '../Common/Helper'

import {
  dengageConvertedDate,
  triggerDengageEvents,
  triggerGTAG
} from '../../utils/utils'

import Step1Form from './Step1Form'

// const isMobile = window.innerWidth < 768
class Step1 extends React.Component {
  constructor (props) {
    super(props)
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)

    this.state = {
      selectTedPostType: this.props.selectTedPostType
        ? this.props.selectTedPostType
        : 'rent',
      ownerOfUnit: false,
      housingType: '',
      // value started
      propertyName: '',
      address: '',
      postCode: '',
      buildUpSize: '',
      price: '',
      negotiable: false,
      floorLevel: 1,
      latitude: 0,
      longitude: 0,
      floorLevelOption: FLOOR_LEVEL_OPTION[0],
      bedroom: HIGHRISE_BED_ROOM_OPTIONS[0],
      bathroom:
        HOUSING_TYPE_OPTIONS[0].value === 'ROOM'
          ? ROOM_BATH_ROOM_OPTIONS[0]
          : LANDED_HIGHRISE_BATH_ROOM_OPTIONS[0],
      parking: PARKING_OPTIONS[0],
      furnishing: FURNISHING_OPTIONS[0],
      fullyFurnish: false,
      roomType: ROOM_TYPE_OPTIONS[0],
      numberOfPax: NUMBEROF_PAX_OPTIONS[0],
      titleType: TITLE_TYPE[0],
      saleType: SALE_TYPE[0],
      landmarkLabelId: '',
      // auto complete
      autocompleteListOpen: false,
      autocompletePropertyList: null,
      tooltipOpen: false,
      toggle: false,
      tooltipOpenName: ''
    }
  }
  setOpen = value => {
    this.setState({
      tooltipOpenName: value
    })
  }
  setWrapperRef (node) {
    this.wrapperRef = node
  }
  componentWillUnmount () {
    this.props.autocompleteActions.removeAutocompleteList()
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
    if (this.props.propertyData) {
      const {
        owner,
        name,
        type,
        address,
        postcode,
        sqft,
        price,
        negotiable,
        level,
        bedroom,
        bathroom,
        bathroomType,
        carpark,
        furnishType,
        fullyFurnishable,
        roomType,
        roommate,
        leaseType,
        storeys,
        saleType,
        latitude,
        longitude
      } = this.props.propertyData

      this.setState({
        latitude: latitude,
        longitude: longitude,
        housingType: type,
        ownerOfUnit: owner,
        selectTedPostType: this.props.selectTedPostType,
        // value started
        propertyName: name,
        address: address,
        postCode: postcode,
        buildUpSize: sqft,
        price: price,

        negotiable: negotiable,
        parking: getDataFromValue(PARKING_OPTIONS, carpark),
        furnishing: getDataFromValue(FURNISHING_OPTIONS, furnishType), // comes with option
        fullyFurnish: fullyFurnishable,
        titleType:
          this.state.selectTedPostType === 'sale'
            ? getDataFromValue(TITLE_TYPE, leaseType)
            : null
      })
      if (type === 'ROOM') {
        this.setState({
          floorLevel: level,
          floorLevelOption: null,
          bedroom: null,
          bathroom: getDataFromValue(ROOM_BATH_ROOM_OPTIONS, bathroomType),
          roomType: getDataFromValue(ROOM_TYPE_OPTIONS, roomType),
          numberOfPax: getDataFromValue(NUMBEROF_PAX_OPTIONS, roommate)
        })
      } else if (type === 'HIGHRISE') {
        this.setState({
          floorLevel: level,
          floorLevelOption: null,
          bedroom: getDataFromValue(HIGHRISE_BED_ROOM_OPTIONS, bedroom),
          bathroom: getDataFromValue(
            LANDED_HIGHRISE_BATH_ROOM_OPTIONS,
            bathroom
          ),
          roomType: '',
          numberOfPax: ''
        })
      } else if (type === 'LANDED') {
        this.setState({
          floorLevelOption: getDataFromValue(FLOOR_LEVEL_OPTION, storeys),
          bedroom: getDataFromValue(BED_ROOM_OPTIONS, bedroom),
          bathroom: getDataFromValue(
            LANDED_HIGHRISE_BATH_ROOM_OPTIONS,
            bathroom
          ),
          roomType: ''
        })
      } else if (type === 'LANDED_SALE') {
        this.setState({
          floorLevelOption: getDataFromValue(FLOOR_LEVEL_OPTION, storeys),
          bedroom: getDataFromValue(BED_ROOM_OPTIONS, bedroom),
          bathroom: getDataFromValue(
            LANDED_HIGHRISE_BATH_ROOM_OPTIONS,
            bathroom
          ),
          roomType: '',
          saleType: getDataFromValue(SALE_TYPE, saleType)
        })
      } else if (type === 'HIGHRISE_SALE') {
        this.setState({
          floorLevel: level,
          bedroom: getDataFromValue(HIGHRISE_BED_ROOM_OPTIONS, bedroom),
          bathroom: getDataFromValue(
            LANDED_HIGHRISE_BATH_ROOM_OPTIONS,
            bathroom
          ),
          roomType: '',
          saleType: getDataFromValue(SALE_TYPE, saleType)
        })
      }
    }
  }
  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        autocompleteListOpen: false
      })
    }
  }
  ownerOfUnitChange = () => {
    this.setState({
      ownerOfUnit: !this.state.ownerOfUnit
    })
  }

  housingTypeChange = e => {
    switch (e.target.value) {
      case 'HIGHRISE':
        this.setState({
          housingType: e.target.value,
          buildUpSize: '',
          bedroom: HIGHRISE_BED_ROOM_OPTIONS[0],
          bathroom: LANDED_HIGHRISE_BATH_ROOM_OPTIONS[0],
          roomType: null,
          numberOfPax: null
        })
        break
      case 'LANDED':
        this.setState({
          housingType: e.target.value,
          buildUpSize: '',
          bedroom: BED_ROOM_OPTIONS[0],
          bathroom: LANDED_HIGHRISE_BATH_ROOM_OPTIONS[0],
          roomType: null,
          numberOfPax: null
        })
        break
      case 'ROOM':
        this.setState({
          housingType: e.target.value,
          buildUpSize: null,
          bedroom: null,
          bathroom: ROOM_BATH_ROOM_OPTIONS[0],
          roomType: ROOM_TYPE_OPTIONS[0],
          numberOfPax: NUMBEROF_PAX_OPTIONS[0]
        })
        break
      case 'LANDED_SALE':
        this.setState({
          housingType: e.target.value,
          buildUpSize: null,
          bedroom: BED_ROOM_OPTIONS[0],
          bathroom: LANDED_HIGHRISE_BATH_ROOM_OPTIONS[0],
          roomType: null,
          numberOfPax: null
        })
        break
      case 'HIGHRISE_SALE':
        this.setState({
          housingType: e.target.value,
          buildUpSize: '',
          bedroom: HIGHRISE_BED_ROOM_OPTIONS[0],
          bathroom: LANDED_HIGHRISE_BATH_ROOM_OPTIONS[0],
          roomType: null,
          numberOfPax: null
        })
        break
      default:
        break
    }
    this.props.firstStepSelected()
  }

  propertyNameChange = e => {
    this.setState(
      {
        propertyName: e.target.value
      },
      () => {
        if (this.state.propertyName.length >= 3) {
          this.deBouncedPropertyName()
        }
      }
    )
  }
  deBouncedPropertyName = _.debounce(function () {
    this.props.autocompleteActions.fetchAutocompleteList(
      this.state.propertyName
    )
  }, 250)
  setPropertyName = property => {
    this.setState({
      propertyName: property.label,
      address: property.address,
      postCode: property.postcode,
      landmarkLabelId: property.id,
      autocompleteListOpen: false
    })
  }
  addressChange = e => {
    this.setState({
      address: e.target.value
    })
  }

  postCodeChange = e => {
    if (e.target.value.length > 5) {
      return
    }
    this.setState({
      postCode: e.target.value
    })
  }

  buildUpSizeChange = e => {
    this.setState({
      buildUpSize: e.target.value
    })
  }

  priceChange = e => {
    this.setState({
      price: e.target.value
    })
  }
  negotiableChange = () => {
    this.setState({
      negotiable: !this.state.negotiable
    })
  }
  floorLevelOptionChange = option => {
    this.setState({
      floorLevelOption: option
    })
  }
  floorLevelChange = e => {
    this.setState({
      floorLevel: e.target.value
    })
  }

  bedroomChange = option => {
    this.setState({
      bedroom: option
    })
  }

  bathroomChange = option => {
    this.setState({
      bathroom: option
    })
  }

  parkingChange = option => {
    this.setState({
      parking: option
    })
  }

  furnishingChange = option => {
    this.setState({
      furnishing: option
    })
  }
  titleTypeChanges = option => {
    this.setState({
      titleType: option
    })
  }
  fullyFurnishChange = () => {
    this.setState({
      fullyFurnish: !this.state.fullyFurnish
    })
  }

  roomTypeChange = option => {
    this.setState({
      roomType: option
    })
  }

  numberOfPaxChange = option => {
    this.setState({
      numberOfPax: option
    })
  }

  checkPriceValidationAndSubmit = () => {
    const { price } = this.state
    const alert = {
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }
    if (
      this.props.selectTedPostType === 'rent' &&
      parseInt(price, 10) > 20000
    ) {
      alert.text = 'So expensive, are you sure it is for rent?'
      Swal.fire(alert).then(isSure => {
        if (isSure.value) {
          this.sendFirstStepData()
        }
        if (isSure.dismiss === 'cancel') {
          this.setState({
            price: ''
          })
        }
      })
    } else if (
      this.props.selectTedPostType === 'sale' &&
      parseInt(price, 10) < 20000
    ) {
      alert.text = 'So cheap, are you sure it is for sale?'
      Swal.fire(alert).then(isSure => {
        if (isSure.value) {
          this.sendFirstStepData()
        }
        if (isSure.dismiss === 'cancel') {
          this.setState({
            price: ''
          })
        }
      })
    } else {
      this.sendFirstStepData()
    }
  }

  triggerStep1GTAG = () => {
    triggerGTAG({
      event: 'PostListing_ALL'
    })
    triggerGTAG({
      event: 'clickCreateListingStep1'
    })
  }

  sendFirstStepData = () => {
    let data = {
      address: this.state.address,
      allRaces: true,
      carpark: this.state.parking.value,
      fullyFurnishable: this.state.fullyFurnish,
      furnishType: this.state.furnishing.value,
      name: this.state.propertyName,
      negotiable: this.state.negotiable,
      owner: this.state.ownerOfUnit,
      postcode: this.state.postCode,
      price: this.state.price,
      type: this.state.housingType,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      landmarkLabelId: this.state.landmarkLabelId
    }
    switch (this.state.housingType) {
      case 'HIGHRISE':
        data.level = this.state.floorLevel
        data.sqft = this.state.buildUpSize
        data.bedroom = this.state.bedroom.value
        data.bathroom = this.state.bathroom.value
        break
      case 'LANDED':
        data.storeys = this.state.floorLevelOption.value
        data.sqft = this.state.buildUpSize
        data.bedroom = this.state.bedroom.value
        data.bathroom = this.state.bathroom.value
        break
      case 'ROOM':
        data.level = this.state.floorLevel
        data.bathroomType = this.state.bathroom.value
        data.roomType = this.state.roomType.value
        data.roommate = this.state.numberOfPax.value
        break
      case 'HIGHRISE_SALE':
        data.level = this.state.floorLevel
        data.sqft = this.state.buildUpSize
        data.bedroom = this.state.bedroom.value
        data.bathroom = this.state.bathroom.value
        data.leaseType = this.state.titleType.value
        data.saleType = this.state.saleType.value
        break
      case 'LANDED_SALE':
        data.storeys = this.state.floorLevelOption.value
        data.sqft = this.state.buildUpSize
        data.bedroom = this.state.bedroom.value
        data.bathroom = this.state.bathroom.value
        data.leaseType = this.state.titleType.value
        data.saleType = this.state.saleType.value
        break
      default:
        break
    }
    const url = window.location.href

    triggerDengageEvents('speed_rent_post_property', {
      event_name: 'complete_pp_1',
      name: this.props.user ? this.props.user.name : '',
      phone_number:
        this.props.user && this.props.user.phoneNumber
          ? this.props.user.phoneNumber
          : '',
      email_address:
        this.props.user && this.props.user.email ? this.props.user.email : '',
      property_value: data.price,
      area_of_property: data.address,
      property_type: data.type,
      date: dengageConvertedDate()
    })
    if (!url.includes('edit')) {
      this.triggerStep1GTAG()
    }
    //put condition for calculate for totalsteps
    this.props.updateFirstStepData(data)
  }

  static getDerivedStateFromProps (props, state) {
    if (state.autocompletePropertyList !== props.autocompletePropertyList) {
      if (props.autocompletePropertyList) {
        if (props.autocompletePropertyList) {
          return {
            autocompleteListOpen: true,
            autocompletePropertyList: props.autocompletePropertyList
          }
        }
      }
    }
    return null
  }
  floorLevelValidate = val => {
    if (val) {
      if (val > 200) {
        return false
      } else {
        return true
      }
    }
  }
  priceValidator = val => {
    if (val) {
      if (val < 1) {
        return false
      } else {
        return true
      }
    }
  }
  buildUpSizeValidator = val => {
    if (val) {
      if (val > 99999 || val < 99) {
        return false
      } else {
        return true
      }
    }
  }

  render () {
    const {
      propertyName,
      ownerOfUnit,
      selectTedPostType,
      housingType,
      negotiable,
      address,
      postCode,
      bedroom,
      buildUpSize,
      bathroom,
      roomType,
      parking,
      price,
      furnishing,
      fullyFurnish,
      floorLevel,
      floorLevelOption,
      numberOfPax,
      autocompletePropertyList,
      autocompleteListOpen,
      titleType,
      tooltipOpen,
      toggle,
      tooltipOpenName
    } = this.state

    return (
      <Step1Form
        styles={this.props.styles}
        setWrapperRef={this.setWrapperRef}
        propertyName={propertyName}
        ownerOfUnit={ownerOfUnit}
        selectTedPostType={selectTedPostType}
        housingType={housingType}
        negotiable={negotiable}
        address={address}
        postCode={postCode}
        bedroom={bedroom}
        buildUpSize={buildUpSize}
        bathroom={bathroom}
        roomType={roomType}
        parking={parking}
        price={price}
        furnishing={furnishing}
        fullyFurnish={fullyFurnish}
        floorLevel={floorLevel}
        floorLevelOption={floorLevelOption}
        numberOfPax={numberOfPax}
        autocompletePropertyList={autocompletePropertyList}
        autocompleteListOpen={autocompleteListOpen}
        titleType={titleType}
        tooltipOpen={tooltipOpen}
        toggle={toggle}
        propertyData={this.props.propertyData}
        checkPriceValidationAndSubmit={this.checkPriceValidationAndSubmit}
        housingTypeChange={this.housingTypeChange}
        ownerOfUnitChange={this.ownerOfUnitChange}
        tooltipOpenName={tooltipOpenName}
        setOpen={this.setOpen}
        propertyNameChange={this.propertyNameChange}
        setPropertyName={this.setPropertyName}
        addressChange={this.addressChange}
        postCodeChange={this.postCodeChange}
        roomTypeChange={this.roomTypeChange}
        buildUpSizeChange={this.buildUpSizeChange}
        buildUpSizeValidator={this.buildUpSizeValidator}
        priceChange={this.priceChange}
        negotiableChange={this.negotiableChange}
        floorLevelOptionChange={this.floorLevelOptionChange}
        floorLevelChange={this.floorLevelChange}
        floorLevelValidate={this.floorLevelValidate}
        numberOfPaxChange={this.numberOfPaxChange}
        bedroomChange={this.bedroomChange}
        bathroomChange={this.bathroomChange}
        parkingChange={this.parkingChange}
        furnishingChange={this.furnishingChange}
        fullyFurnishChange={this.fullyFurnishChange}
        titleTypeChanges={this.titleTypeChanges}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    autocompletePropertyList: state.autocompleteList.autocompleteList,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autocompleteActions: bindActionCreators(autocompleteActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step1)
