import { combineReducers } from 'redux'
import notifyReducer from 'react-redux-notify'

import language from './language'
import areas from './areas'
import categories from './categories'
import subscribeStatus from './subscribe'
import autocompleteList from './autocompleteList'
import propertyList from './propertyList'
import profile from './profile'
import auth from './authReducer'
import ramci from './ramciReducer'
import property from './property'
import favorites from './favorites'
import subscribePropertyAlert from './subscribePropertyAlert'
import homeOwnership from './homeOwnership'
import post from './postReducer'
import disableFooter from './disableFooterReducer'
import deal from './deal'
import singleProperty from './singleProperty'
import chatReducer from './chatReducer'
import learnReducer from './learnReducer'
import bannerTextReducer from './bannerTextReducer'

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
