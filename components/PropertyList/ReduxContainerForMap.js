import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store'

const ReduxContainerForMap = props => {
  return <Provider store={store}>{props.children}</Provider>
}

export default React.memo(ReduxContainerForMap)
