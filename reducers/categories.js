const initialState = [
  {
    id: 0,
    name: 'Studio',
    link: 'studio'
  },
  {
    id: 1,
    name: 'Apartment',
    link: 'apartment'
  },
  {
    id: 2,
    name: 'Condo',
    link: 'condo'
  },
  {
    id: 3,
    name: 'Room',
    link: 'room'
  },
  {
    id: 4,
    name: 'House',
    link: 'house'
  },
  {
    id: 5,
    name: 'Terrace',
    link: 'terrace'
  }
]

function categories (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default categories
