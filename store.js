import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './root-reducer'
import thunk from 'redux-thunk'

export const store = createStore(
  rootReducer,
  typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)
