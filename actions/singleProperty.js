export const SELECT_PROPERTY = 'SELECT_PROPERTY'
export const DESELECT_PROPERTY = 'DESELECT_PROPERTY'

export const selectProperty = property => {
  return {
    type: SELECT_PROPERTY,
    payload: property
  }
}

export const deselectProperty = () => {
  return {
    type: DESELECT_PROPERTY
  }
}


