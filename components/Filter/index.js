import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Router, { withRouter } from 'next/router'

import * as autocompleteActions from '../../actions/autocomplete'
import { getSearchPresetFilter } from '../../actions/property'

import { getPropertyNameLink } from '../Common/Helper'
import { userEventTracking } from '../../actions'
import FilterPropertyType from './FilterPropertyType'
import FilterPriceSlider from './FilterPriceSlider'
import FilterInputBox from './FilterInputBox'
import FilterMore from './FilterMore'
import FilterSpecialOffer from './FilterSecialOffers'
import styles from './index.module.scss'
import { dengageConvertedDate, triggerDengageEvents } from '../../utils/utils'
import { getDeviceId } from '../../globalutilities/helpers'

class Filter extends React.Component {
  constructor (props) {
    super(props)

    const { queryData, page } = this.props

    let rooms = -1
    let roomType = -1
    let bathrooms = -1
    let bathroomType = -1

    if (queryData) {
      if (queryData.bed) {
        if (queryData.types && queryData.types === 'room') {
          roomType = Number(queryData.bed)
        } else {
          rooms = Number(queryData.bed)
        }
      } else {
        rooms =
          queryData && queryData.types
            ? queryData.types.includes('studio')
              ? 0
              : queryData.types.includes('apartment') ||
                queryData.types.includes('condo')
              ? 2
              : -1
            : -1
      }

      if (queryData.bath) {
        if (queryData.types && queryData.types === 'room') {
          bathroomType = Number(queryData.bath)
        } else {
          bathrooms = Number(queryData.bath)
        }
      }
    }

    let searchQuery = ''
    if (queryData && queryData.q) {
      searchQuery = queryData.q
    } else if (queryData && queryData.loc) {
      searchQuery = queryData.loc
    }

    this.state = {
      cursor: -1,
      page: page ? page : '',
      queryData: {},
      showSortPopup: false,
      sortedAutocompleteList: [],
      openedPopupName: '',
      searchQuery,
      searchCategory: '',
      map: queryData && queryData.map ? queryData.map : -1,
      location: queryData && queryData.loc ? queryData.loc : '',
      url: (page && /buy/.test(page)) || /beli/.test(page) ? 'buy' : 'rent',
      types:
        queryData && queryData.types && queryData.types.split(',').length > 0
          ? queryData.types.split(',')
          : [],
      furnish: queryData && queryData.furnish ? Number(queryData.furnish) : -1,
      rentSlider: {
        currentValue:
          queryData && queryData.min
            ? [Number(queryData.min), Number(queryData.max)]
            : [0, 6000],
        step: 1,
        max: 6000,
        min: 0
        // ticks: [0, 1000, 2000, 3000, 4000, 5000, 6000],
        // ticksLabels: ["0", "1000", "2000", "3000", "4000", "5000", "6000"]
      },
      buySlider: {
        currentValue:
          queryData && queryData.min
            ? [Number(queryData.min), Number(queryData.max)]
            : [0, 5000000],
        step: 5000,
        max: 5000000,
        min: 0
        // ticks: [0, 1000000, 2000000, 3000000, 4000000, 5000000],
        // ticksLabels: ["0", "1M", "2M", "3M", "4M", "5M"]
      },

      rentSliderValueMin:
        queryData && queryData.min ? Number(queryData.min) : 0,
      rentSliderValueMax:
        queryData && queryData.max ? Number(queryData.max) : 6000,
      buySliderValueMin: queryData && queryData.min ? Number(queryData.min) : 0,
      buySliderValueMax:
        queryData && queryData.max ? Number(queryData.max) : 5000000,

      leaseType: queryData && queryData.leaseType ? queryData.leaseType : '',
      rooms,
      roomType,
      bathrooms,
      bathroomType,
      cars: queryData && queryData.car ? Number(queryData.car) : -1,
      names: queryData && queryData.name ? queryData.name : '',
      ref: queryData && queryData.name ? queryData.name : '',
      ptDeals:
        queryData && queryData.partnersDeal
          ? Number(queryData.partnersDeal)
          : -1,
      hotDeals: queryData && queryData.hotDeal ? Number(queryData.hotDeal) : -1,
      lrt: queryData && queryData.lrt ? Number(queryData.lrt) : -1,
      petFriendly:
        queryData && queryData.petFriendly ? Number(queryData.petFriendly) : -1,
      allRaces:
        queryData && queryData.allRaces ? Number(queryData.allRaces) : -1,
      instantView:
        queryData && queryData.instantView ? Number(queryData.instantView) : -1,
      landmarkLabelId: queryData && queryData.lm ? queryData.lm : -1,
      isSelectedFromAutoCompleteSearch: false,
      isPresetFilterActive: true
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (state.autocompleteList !== props.autocompleteList) {
      if (props.autocompleteList) {
        return {
          autocompleteList: props.autocompleteList
        }
      }
    }

    return null
  }

  componentDidMount () {
    this.props.presetFilterActions()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.autocompleteList !== this.props.autocompleteList) {
      if (this.props.autocompleteList) {
        this.sortAutocompleteList(this.props.autocompleteList)
      }
    }
  }

  //Autocomplete
  changeSearchQuery = e => {
    this.setState({
      searchQuery: e.target.value
    })

    if (this.state.searchQuery.length > 0) {
      this.props.autocompleteActions.fetchAutocompleteList(
        this.state.searchQuery
      )
    }
  }

  sortAutocompleteList = data => {
    let sortedAutocompleteList = []
    Object.keys(data).forEach(function (key) {
      const category = key
      data[key].forEach(function (element) {
        sortedAutocompleteList.push({
          id: element.id,
          label: element.label,
          landmarkLabelId: element.id,
          category
        })
      })
    })

    sortedAutocompleteList = sortedAutocompleteList.slice(0, 20)

    this.setState({
      sortedAutocompleteList
    })
  }

  setAutocompleteItem = item => {
    this.setState(
      {
        selectedItemForSearch: item,
        searchQuery: item.label,
        searchCategory: item.category,
        landmarkLabelId: item.landmarkLabelId,
        sortedAutocompleteList: [],
        isSelectedFromAutoCompleteSearch: true
      },
      () => {
        this.search()
      }
    )
  }

  openPopup = name => {
    if (this.state.openedPopupName === name) {
      this.setState({
        openedPopupName: ''
      })
    } else {
      this.setState({
        openedPopupName: name
      })
    }
  }

  changeUrl = url => {
    this.setState({
      url,
      types: [],
      furnish: -1,
      rentSlider: {
        currentValue: [0, 6000],
        step: 1,
        max: 6000,
        min: 0
        // ticks: [0, 1000, 2000, 3000, 4000, 5000, 6000],
        // ticksLabels: ["0", "1000", "2000", "3000", "4000", "5000", "6000"]
      },
      buySlider: {
        currentValue: [0, 5000000],
        step: 5000,
        max: 5000000,
        min: 0
        // ticks: [0, 1000000, 2000000, 3000000, 4000000, 5000000],
        // ticksLabels: ["0", "1M", "2M", "3M", "4M", "5M"]
      },
      rentSliderValueMin: 0,
      rentSliderValueMax: 6000,
      buySliderValueMin: 0,
      buySliderValueMax: 5000000,

      leaseType: '',
      rooms: -1,
      roomType: -1,
      bathrooms: -1,
      bathroomType: -1,
      cars: -1,
      lrt: -1,
      petFriendly: -1,
      allRaces: -1,
      instantView: -1,
      landmarkLabelId: -1,
      ptDeals: -1,
      hotDeals: -1,
      names: '',
      ref: ''
    })
  }

  changeUrlFromSelect = data => {
    let url = ''
    if (this.props.queryData && this.props.queryData.lang === 'zh') {
      url = data.label === '租' ? 'rent' : 'buy'
    } else if (this.props.queryData && this.props.queryData.lang === 'my') {
      url = data.label === 'sewa' ? 'sewa' : 'beli'
    } else {
      url = data.label === 'rent' ? 'rent' : 'buy'
    }
    let searchQuery = `${
      this.props.queryData.lang ? '/' + this.props.queryData.lang : ''
    }/${url}`

    if (this.state.location !== '') {
      searchQuery += '/' + this.state.location /* .replace(/[ ]/g, '-') */ // changed
    } else {
      searchQuery += '/kuala-lumpur'
    }

    this.changeUrl(
      data.label === 'rent' || data.label === 'sewa' ? 'rent' : 'buy'
    )

    Router.push(searchQuery)
  }

  //Type popup
  changeType = type => {
    let types = this.state.types
    const elIndex = types.findIndex(item => item === type)

    if (elIndex !== -1) {
      types.splice(elIndex, elIndex + 1)
    } else {
      types.push(type)
    }

    this.setState({
      types
    })
  }

  clearTypes = () => {
    this.setState({
      types: []
    })
  }

  //Furnish
  changeFurnish = furnish => {
    this.setState({
      furnish
    })
  }

  clearFurnish = () => {
    this.setState({
      furnish: -1
    })
  }

  //Price popup
  changeRentSliderValue = (e, value) => {
    let rentSlider = Object.assign({}, this.state.rentSlider)
    rentSlider.currentValue = value

    this.setState({
      rentSlider,
      rentSliderValueMin: value[0],
      rentSliderValueMax: value[1]
    })
  }

  changeRentSliderValueMin = e => {
    let rentSlider = Object.assign({}, this.state.rentSlider)
    let val = Number(e.target.value)

    if (val <= rentSlider.max && val < rentSlider.currentValue[1]) {
      this.setState({
        rentSliderValueMin: val
      })
    }

    if (val < rentSlider.currentValue[1]) {
      rentSlider.currentValue[0] = val
      this.setState({
        rentSlider
      })
    }
  }

  changeRentSliderValueMax = e => {
    let rentSlider = Object.assign({}, this.state.rentSlider)
    let val = Number(e.target.value)
    if (val <= rentSlider.max) {
      this.setState({
        rentSliderValueMax: val
      })
    }
    if (val > rentSlider.currentValue[0] && val <= rentSlider.max) {
      rentSlider.currentValue[1] = val
      this.setState({
        rentSlider
      })
    }
  }

  changeBuySliderValue = (e, value) => {
    let buySlider = Object.assign({}, this.state.buySlider)
    buySlider.currentValue = value

    this.setState({
      buySlider,
      buySliderValueMin: value[0],
      buySliderValueMax: value[1]
    })
  }

  changeBuySliderValueMin = e => {
    let buySlider = Object.assign({}, this.state.buySlider)
    let val = Number(e.target.value)

    if (val <= buySlider.max && val < buySlider.currentValue[1]) {
      this.setState({
        buySliderValueMin: val
      })
    }

    if (val < buySlider.currentValue[1]) {
      buySlider.currentValue[0] = Number(e.target.value)
      this.setState({
        buySlider
      })
    }
  }

  changeBuySliderValueMax = e => {
    let buySlider = Object.assign({}, this.state.buySlider)
    let val = Number(e.target.value)

    if (val <= buySlider.max) {
      this.setState({
        buySliderValueMax: val
      })
    }

    if (val > buySlider.currentValue[0] && val <= buySlider.max) {
      buySlider.currentValue[1] = Number(e.target.value)
      this.setState({
        buySlider
      })
    }
  }

  clearPrice = () => {
    let rentSlider = Object.assign({}, this.state.rentSlider)
    rentSlider.currentValue = [0, 6000]
    let buySlider = Object.assign({}, this.state.buySlider)
    buySlider.currentValue = [0, 5000000]

    this.setState({
      rentSlider,
      buySlider
    })
  }

  //More filter
  closeMoreFilter = () => {
    this.setState({
      openedPopupName: ''
    })
  }

  changeRooms = rooms => {
    if (this.state.rooms === rooms) {
      this.setState({
        rooms: -1,
        roomType: -1
      })
    } else {
      this.setState({
        rooms,
        roomType: -1
      })
    }
  }

  changeRoomType = roomType => {
    if (this.state.roomType === roomType) {
      this.setState({
        roomType: -1,
        rooms: -1
      })
    } else {
      this.setState({
        roomType,
        rooms: -1
      })
    }
  }

  changeBathrooms = bathrooms => {
    if (this.state.bathrooms === bathrooms) {
      this.setState({
        bathrooms: -1,
        bathroomType: -1
      })
    } else {
      this.setState({
        bathrooms,
        bathroomType: -1
      })
    }
  }

  changeBathroomType = bathroomType => {
    if (this.state.bathroomType === bathroomType) {
      this.setState({
        bathroomType: -1,
        bathrooms: -1
      })
    } else {
      this.setState({
        bathroomType,
        bathrooms: -1
      })
    }
  }

  changeCars = cars => {
    if (this.state.cars === cars) {
      this.setState({
        cars: -1
      })
    } else {
      this.setState({
        cars
      })
    }
  }

  changePartnersDeal = (ptDeals, names) => {
    if (this.state.names === names.campaignName) {
      this.setState({
        names: ''
      })
    } else {
      this.setState({
        names: names.campaignName
      })
    }
    if (this.state.ref === names.ref) {
      this.setState({
        ref: ''
      })
    } else {
      this.setState({
        ref: names.ref
      })
    }
    if (this.state.ptDeals === ptDeals) {
      this.setState({
        ptDeals: -1,
        hotDeals: -1
      })
    } else {
      this.setState({
        ptDeals,
        hotDeals: -1
      })
    }
  }

  changeHotDeal = (hotDeals, names) => {
    if (this.state.names === names.bannerDescription) {
      this.setState({
        names: ''
      })
    } else {
      this.setState({
        names: names.bannerDescription
      })
    }
    if (this.state.hotDeals === hotDeals) {
      this.setState({
        hotDeals: -1,
        ptDeals: -1
      })
    } else {
      this.setState({
        hotDeals: names.id,
        ptDeals: -1
      })
    }
  }

  changeLrt = () => {
    if (this.state.lrt === -1) {
      this.setState({
        lrt: 1
      })
    } else {
      this.setState({
        lrt: -1
      })
    }
  }

  changePetFriendly = () => {
    if (this.state.petFriendly === -1) {
      this.setState({
        petFriendly: 1
      })
    } else {
      this.setState({
        petFriendly: -1
      })
    }
  }

  changeAllRaces = () => {
    if (this.state.allRaces === -1) {
      this.setState({
        allRaces: 1
      })
    } else {
      this.setState({
        allRaces: -1
      })
    }
  }

  changeInstantView = () => {
    if (this.state.instantView === -1) {
      this.setState({
        instantView: 1
      })
    } else {
      this.setState({
        instantView: -1
      })
    }
  }

  //Lease Type
  changeLeaseType = leaseType => {
    if (this.state.leaseType === leaseType) {
      this.setState({
        leaseType: ''
      })
    } else {
      this.setState({
        leaseType
      })
    }
  }

  clearMoreFilter = () => {
    this.setState({
      leaseType: '',
      rooms: -1,
      roomType: -1,
      bathrooms: -1,
      bathroomType: -1,
      cars: -1,
      lrt: -1,
      petFriendly: -1,
      ptDeals: -1,
      names: '',
      ref: '',
      hotDeals: -1,
      allRaces: -1,
      instantView: -1
    })
  }
  clearSpecialFilter = () => {
    this.setState({
      ptDeals: -1,
      names: '',
      hotDeals: -1,
      ref: ''
    })
  }

  clearSpFilter = () => {
    this.setState(
      {
        ptDeals: -1,
        names: '',
        hotDeals: -1,
        ref: ''
      },
      () => {
        this.props.router.push('/csearch')
      }
    )
  }
  //Change to map View
  changeToMap = () => {
    if (Number(this.state.map) === -1) {
      this.setState(
        {
          map: 1
        },
        () => {
          this.search()
        }
      )
    } else {
      this.setState(
        {
          map: -1
        },
        () => {
          this.search()
        }
      )
    }
  }

  //Sorting
  changeSort = sortType => {
    this.setState(
      {
        sortType
      },
      () => {
        this.search()
      }
    )
  }

  //keyPress

  handleKeyDown = e => {
    const { cursor, sortedAutocompleteList } = this.state
    if (e.keyCode === 38 && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }))
    } else if (e.keyCode === 40 && cursor < sortedAutocompleteList.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }))
    } else if (e.keyCode === 13) {
      if (cursor >= 0 && sortedAutocompleteList[cursor]) {
        this.setAutocompleteItem(sortedAutocompleteList[cursor])
      } else {
        this.search()
      }
    }
  }

  //build search url
  search = () => {
    let searchUrl = {
      url: '',
      path: ''
    }
    if (this.state.url === 'rent') {
      searchUrl.url = this.props.router.locale === 'my' ? '/sewa' : '/rent'
    } else {
      searchUrl.url = '/buy'
    }
    const chooseSelector = () => {
      if (!searchUrl.url.includes('?')) {
        searchUrl.url += '?'
      } else {
        searchUrl.url += '&'
      }
    }

    //Location
    if (this.state.searchQuery !== '') {
      searchUrl.url += '/' + getPropertyNameLink(this.state.searchQuery)
    } else if (this.state.location !== '') {
      searchUrl.url += '/' + getPropertyNameLink(this.state.location)
    } else {
      searchUrl.url += '/kuala-lumpur'
    }

    //Types
    if (this.state.types.length > 0) {
      searchUrl.url += `/${this.state.types.join('%2C')}`
      this.state.isPresetFilterActive = false
    }

    //Query
    if (this.state.searchQuery !== '') {
      chooseSelector()
      searchUrl.url += `q=${this.state.searchQuery.replace(/[-]/g, ' ')}`
    }

    //Category
    if (this.state.searchCategory !== '') {
      chooseSelector()
      searchUrl.url += `category=${this.state.searchCategory.replace(
        /[-]/g,
        ' '
      )}`
    }

    //More Filter
    //Rooms
    if (this.state.rooms !== -1 && this.state.roomType === -1) {
      chooseSelector()
      searchUrl.url += `bed=${this.state.rooms}`
      this.state.isPresetFilterActive = false
    }

    if (this.state.roomType !== -1 && this.state.rooms === -1) {
      chooseSelector()
      searchUrl.url += `bed=${this.state.roomType}`
      this.state.isPresetFilterActive = false
    }

    //Bathrooms
    if (this.state.bathrooms !== -1 && this.state.bathroomType === -1) {
      chooseSelector()
      searchUrl.url += `bath=${this.state.bathrooms}`
      this.state.isPresetFilterActive = false
    }

    if (this.state.bathroomType !== -1 && this.state.bathrooms === -1) {
      chooseSelector()
      searchUrl.url += `bath=${this.state.bathroomType}`
      this.state.isPresetFilterActive = false
    }

    //Cars
    if (this.state.cars !== -1) {
      chooseSelector()
      searchUrl.url += `car=${this.state.cars}`
      this.state.isPresetFilterActive = false
    }

    //additional params
    if (this.state.lrt !== -1) {
      chooseSelector()
      searchUrl.url += `lrt=${this.state.lrt}`
      this.state.isPresetFilterActive = false
    }

    if (this.state.petFriendly !== -1) {
      chooseSelector()
      searchUrl.url += `petFriendly=${this.state.petFriendly}`
      this.state.isPresetFilterActive = false
    }

    if (this.state.allRaces !== -1) {
      chooseSelector()
      searchUrl.url += `allRaces=${this.state.allRaces}`
      this.state.isPresetFilterActive = false
    }

    if (this.state.instantView !== -1) {
      chooseSelector()
      searchUrl.url += `instantView=${this.state.instantView}`
      this.state.isPresetFilterActive = false
    }

    //Furnish
    if (this.state.furnish !== -1) {
      chooseSelector()
      searchUrl.url += `furnish=${this.state.furnish}`
      this.state.isPresetFilterActive = false
    }

    //landmarkLabelId
    if (
      this.state.landmarkLabelId !== -1 &&
      this.state.isSelectedFromAutoCompleteSearch
    ) {
      chooseSelector()
      searchUrl.url += `lm=${this.state.landmarkLabelId}`
    }

    //Price
    if (this.state.url === 'rent') {
      if (
        this.state.rentSlider.currentValue[0] !== this.state.rentSlider.min ||
        this.state.rentSlider.currentValue[1] !== this.state.rentSlider.max
      ) {
        chooseSelector()
        searchUrl.url += `min=${this.state.rentSlider.currentValue[0]}`
        chooseSelector()
        searchUrl.url += `max=${this.state.rentSlider.currentValue[1]}`
        this.state.isPresetFilterActive = false
      }
    } else {
      if (
        this.state.buySlider.currentValue[0] !== this.state.buySlider.min ||
        this.state.buySlider.currentValue[1] !== this.state.buySlider.max
      ) {
        chooseSelector()
        searchUrl.url += `min=${this.state.buySlider.currentValue[0]}`
        chooseSelector()
        searchUrl.url += `max=${this.state.buySlider.currentValue[1]}`
      }
    }

    //Lease Type
    if (this.state.leaseType !== '') {
      chooseSelector()
      searchUrl.url += `leaseType=${this.state.leaseType}`
      this.state.isPresetFilterActive = false
    }

    //Sorting
    if (this.state.sortType && Number(this.state.map) === -1) {
      chooseSelector()
      searchUrl.url += `sort=${this.state.sortType}`
    }

    if (Number(this.state.map) !== -1) {
      chooseSelector()
      searchUrl.url += `map=${this.state.map}`
    }
    // Preset Filter
    const areaToPriceMapping = this.props.presetFilter
    const searchQuery =
      getPropertyNameLink(this.state.searchQuery).toLowerCase() ||
      'kuala-lumpur'
    if (
      this.state.url === 'rent' &&
      searchQuery &&
      this.state.isPresetFilterActive
    ) {
      const locationExists = areaToPriceMapping.find(
        loc => loc.area === searchQuery
      )
      if (locationExists) {
        const currentUrlString = searchUrl.url.split('/')
        const beforeParam = currentUrlString.slice(-1)[0].split('?')[0]
        const afterParam = currentUrlString.slice(-1)[0].split('?')[1]
        currentUrlString[currentUrlString.length - 1] =
          beforeParam + '/highrise?' + (afterParam || '')
        searchUrl.url = currentUrlString.join('/')
        chooseSelector()
        searchUrl.url += `min=${locationExists.price[0]}`
        chooseSelector()
        searchUrl.url += `max=${locationExists.price[1]}`
        chooseSelector()
        searchUrl.url += `presetFilter=true`
      }
    }
    this.setState(
      {
        openedPopupName: ''
      },
      async () => {
        await userEventTracking(
          'Search',
          this.state.searchQuery || 'kuala-lumpur'
        )

        if (this.props.user) {
          triggerDengageEvents('search_area', {
            event_name: 'search_area',
            name:
              this.props.user && this.props.user.name
                ? this.props.user.name
                : '',
            phone_number:
              this.props.user && this.props.user.phoneNumber
                ? this.props.user.phoneNumber
                : '',
            email_address: this.props.user.email ? this.props.user.email : '',
            search_term: this.state.searchQuery,
            search_type: this.state.selectedItemForSearch
              ? this.state.selectedItemForSearch.category.toLowerCase()
              : '',
            date_of_search: dengageConvertedDate(),
            device_token: getDeviceId()
          })
        } else {
          triggerDengageEvents('search_area_no_login', {
            event_name: 'search_area_no_login',
            search_term: this.state.searchQuery,
            search_type: this.state.selectedItemForSearch
              ? this.state.selectedItemForSearch.category.toLowerCase()
              : '',
            date_of_search: dengageConvertedDate()
          })
        }

        if (this.props.router.locale === 'en') {
          window.location.href = searchUrl.url
        } else {
          window.location.href = `/${this.props.router.locale}${searchUrl.url}`
        }
      }
    )
  }

  clearPresetFilter = () => {
    this.state.rentSlider.currentValue = [0, 6000]
    this.state.types = []
    this.state.isPresetFilterActive = false
    this.search()
  }

  //build Special Search
  SpSearch = () => {
    let searchUrl = {
      url: '',
      path: ''
    }

    const chooseSelector = () => {
      if (!searchUrl.url.includes('?')) {
        searchUrl.url += '?'
      } else {
        searchUrl.url += '&'
      }
    }

    if (this.state.ptDeals !== -1) {
      chooseSelector()
      searchUrl.url += `partnersDeal=${this.state.ptDeals}`
    }

    //hotDeals
    if (this.state.hotDeals !== -1) {
      chooseSelector()
      searchUrl.url += `hotDeal=${this.state.hotDeals}`
    }

    //deal name
    if (this.state.names !== '') {
      chooseSelector()
      searchUrl.url += `name=${this.state.names}`
    }

    if (this.state.ref !== '') {
      chooseSelector()
      searchUrl.url += `ref=${this.state.ref}`
    }

    window.location.href = `/csearch/${searchUrl.url}`
  }

  showSortPopupMethod = () => {
    this.setState({
      showSortPopup: !this.state.showSortPopup
    })
  }

  marks = [
    { value: 0, label: '0' },
    { value: 1000, label: '1000' },
    { value: 2000, label: '2000' },
    { value: 3000, label: '3000' },
    { value: 4000, label: '4000' },
    { value: 5000, label: '5000' },
    { value: 6000, label: '6000' }
  ]

  buyMarks = [
    { value: 0, label: '0' },
    { value: 1000000, label: '1M' },
    { value: 2000000, label: '2M' },
    { value: 3000000, label: '3M' },
    { value: 4000000, label: '4M' },
    { value: 5000000, label: '5M' }
  ]

  sliderOverrides = {
    root: 'sliderSlider',
    mark: 'sliderMark',
    thumb: 'sliderThumb',
    markLabel: 'sliderMarkLabel'
  }

  render () {
    let typesNames = []
    let currentLang = ''
    if (this.props.router.locale === 'my') {
      currentLang = 'my'
    } else if (this.props.router.locale === 'zh') {
      currentLang = 'zh'
    } else {
      currentLang = 'en'
    }

    this.state.types.map(item => {
      let updatedItem = item
      if (item === 'house' || item === 'house_sale' || item == 'terrace') {
        updatedItem =
          currentLang === 'en'
            ? 'Landed'
            : currentLang === 'my'
            ? 'Rumah Atas Tanah'
            : '有地房子'
      } else if (
        item == 'condo' ||
        item == 'studio' ||
        item == 'apartment' ||
        item === 'highrise' ||
        item === 'highrise_sale'
      ) {
        updatedItem =
          currentLang === 'en'
            ? 'Highrise'
            : currentLang === 'my'
            ? 'Rumah Bertingkat'
            : '高楼住宅'
      } else
        updatedItem =
          currentLang === 'en'
            ? 'Room'
            : currentLang === 'my'
            ? 'Bilik'
            : '房间'
      typesNames.push(updatedItem)
    })

    let furnish = -1
    if (this.state.furnish !== -1) {
      if (this.state.furnish === 0) {
        furnish =
          currentLang === 'en'
            ? 'No Furnishing'
            : currentLang === 'my'
            ? 'Tiada Perabot'
            : '无装潢'
      } else if (this.state.furnish === 1) {
        furnish =
          currentLang === 'en'
            ? 'Partial Furnishing'
            : currentLang === 'my'
            ? 'Separa Perabot'
            : '部分装潢'
      } else {
        furnish =
          currentLang === 'en'
            ? 'Fully Furnishing'
            : currentLang === 'my'
            ? 'Perabot Lengkap'
            : '全装潢'
      }
    }

    let prices = []

    if (this.state.url === 'rent') {
      if (
        this.state.rentSlider.currentValue[0] !== this.state.rentSlider.min ||
        this.state.rentSlider.currentValue[1] !== this.state.rentSlider.max
      ) {
        prices = this.state.rentSlider.currentValue
      }
    } else {
      if (
        this.state.buySlider.currentValue[0] !== this.state.buySlider.min ||
        this.state.buySlider.currentValue[1] !== this.state.buySlider.max
      ) {
        prices = this.state.buySlider.currentValue
      }
    }

    return (
      <div className={`${styles['filter-wrap']} container`}>
        <div className={styles['filter-box-container']}>
          <FilterPropertyType
            page={this.state.page}
            url={this.state.url}
            changeUrl={this.changeUrl}
            styles={styles}
          />

          <FilterInputBox
            furnish={furnish}
            typesNames={typesNames}
            prices={prices}
            page={this.state.page}
            url={this.state.url}
            searchQuery={this.state.searchQuery}
            sortedAutocompleteList={this.state.sortedAutocompleteList}
            openedPopupName={this.state.openedPopupName}
            leaseType={this.state.leaseType}
            rooms={this.state.rooms}
            roomType={this.state.roomType}
            bathrooms={this.state.bathrooms}
            bathroomType={this.state.bathroomType}
            cars={this.state.cars}
            lrt={this.state.lrt}
            petFriendly={this.state.petFriendly}
            allRaces={this.state.allRaces}
            instantView={this.state.instantView}
            map={this.state.map}
            ptDeals={this.state.ptDeals}
            names={this.state.names}
            htDeals={this.state.hotDeals}
            clearMoreFilter={this.clearMoreFilter}
            clearSpFilter={this.clearSpFilter}
            showSortPopup={this.state.showSortPopup}
            showSortPopupMethod={this.showSortPopupMethod}
            changeUrlFromSelect={this.changeUrlFromSelect}
            changeSearchQuery={this.changeSearchQuery}
            search={this.search}
            setAutocompleteItem={this.setAutocompleteItem}
            openPopup={this.openPopup}
            changeSort={this.changeSort}
            changeToMap={this.changeToMap}
            handleKeyDown={this.handleKeyDown}
            cursor={this.state.cursor}
            presetFilterStatus={
              this.props.queryData && this.props.queryData.presetFilter
            }
            clearPresetFilter={this.clearPresetFilter}
          />
          <FilterPriceSlider
            openedPopupName={this.state.openedPopupName}
            url={this.state.url}
            rentSlider={this.state.rentSlider}
            rentSliderValueMin={this.state.rentSliderValueMin}
            rentSliderValueMax={this.state.rentSliderValueMax}
            buySlider={this.state.buySlider}
            buySliderValueMin={this.state.buySliderValueMin}
            buySliderValueMax={this.state.buySliderValueMax}
            types={this.state.types}
            furnish={this.state.furnish}
            sliderOverrides={this.sliderOverrides}
            marks={this.marks}
            changeRentSliderValue={this.changeRentSliderValue}
            changeRentSliderValueMin={this.changeRentSliderValueMin}
            changeRentSliderValueMax={this.changeRentSliderValueMax}
            buyMarks={this.buyMarks}
            changeBuySliderValue={this.changeBuySliderValue}
            changeBuySliderValueMin={this.changeBuySliderValueMin}
            changeBuySliderValueMax={this.changeBuySliderValueMax}
            clearPrice={this.clearPrice}
            search={this.search}
            changeType={this.changeType}
            clearTypes={this.clearTypes}
            changeFurnish={this.changeFurnish}
            clearFurnish={this.clearFurnish}
            styles={styles}
          />

          <FilterMore
            openedPopupName={this.state.openedPopupName}
            url={this.state.url}
            leaseType={this.state.leaseType}
            types={this.state.types}
            roomType={this.state.roomType}
            rooms={this.state.rooms}
            bathroomType={this.state.bathroomType}
            bathrooms={this.state.bathrooms}
            cars={this.state.cars}
            petFriendly={this.state.petFriendly}
            allRaces={this.state.allRaces}
            instantView={this.state.instantView}
            lrt={this.state.lrt}
            closeMoreFilter={this.closeMoreFilter}
            clearMoreFilter={this.clearMoreFilter}
            changeLeaseType={this.changeLeaseType}
            changeRoomType={this.changeRoomType}
            changeRooms={this.changeRooms}
            changeBathroomType={this.changeBathroomType}
            changeBathrooms={this.changeBathrooms}
            changeCars={this.changeCars}
            changePetFriendly={this.changePetFriendly}
            changeAllRaces={this.changeAllRaces}
            changeInstantView={this.changeInstantView}
            changeLrt={this.changeLrt}
            search={this.search}
            styles={styles}
          />
          <FilterSpecialOffer
            openedPopupName={this.state.openedPopupName}
            url={this.state.url}
            names={this.state.names}
            ptDeals={this.state.ptDeals}
            htDeals={this.state.hotDeals}
            closeMoreFilter={this.closeMoreFilter}
            clearMoreFilter={this.clearSpecialFilter}
            changePartnersDeal={this.changePartnersDeal}
            changeHotDeal={this.changeHotDeal}
            SpSearch={this.SpSearch}
            styles={styles}
          ></FilterSpecialOffer>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.auth.user,
    language: state.language,
    areas: state.areas,
    categories: state.categories,
    autocompleteList: state.autocompleteList.autocompleteList,
    presetFilter: state.property.presetFilter
  }
}

function actionsStateToProps (dispatch) {
  return {
    autocompleteActions: bindActionCreators(autocompleteActions, dispatch),
    presetFilterActions: bindActionCreators(getSearchPresetFilter, dispatch)
  }
}

export default connect(
  mapStateToProps,
  actionsStateToProps
)(React.memo(withRouter(Filter)))
