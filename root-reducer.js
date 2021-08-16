import { combineReducers } from 'redux'

import notifyReducer from 'react-redux-notify'

import language from './reducers/language'
import areas from './reducers/areas'
import categories from './reducers/categories'
import subscribeStatus from './reducers/subscribe'
import autocompleteList from './reducers/autocompleteList'
import propertyList from './reducers/propertyList'
import profile from './reducers/profile'
import auth from './reducers/authReducer'
import ramci from './reducers/ramciReducer'
import property from './reducers/property'
import favorites from './reducers/favorites'
import subscribePropertyAlert from './reducers/subscribePropertyAlert'
import homeOwnership from './reducers/homeOwnership'
import post from './reducers/postReducer'
import disableFooter from './reducers/disableFooterReducer'
import deal from './reducers/deal'
import singleProperty from './reducers/singleProperty'
import chatReducer from './reducers/chatReducer'
import learnReducer from './reducers/learnReducer'
import bannerTextReducer from './reducers/bannerTextReducer'

export const rootReducer = combineReducers({
  notifications: notifyReducer,
  language,
  areas,
  categories,
  subscribeStatus,
  autocompleteList,
  propertyList,
  profile,
  auth,
  ramci,
  property,
  favorites,
  subscribePropertyAlert,
  homeOwnership,
  post,
  disableFooter,
  deal,
  singleProperty,
  chatReducer,
  learnReducer,
  bannerTextReducer
})
