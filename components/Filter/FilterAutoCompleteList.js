import React from 'react'

import HomeIcon from '@material-ui/icons/Home'
import BusIcon from '@material-ui/icons/DirectionsBus'
import PlaceIcon from '@material-ui/icons/Place'

const FilterAutoCompleteList = props => {
  const { sortedAutocompleteList, setAutocompleteItem, cursor } = props

  if (sortedAutocompleteList.length > 0) {
    return (
      <ul
        className='ui-autocomplete ui-front ui-menu ui-widget ui-widget-content'
        id='ui-id-1'
        tabIndex='0'
      >
        {sortedAutocompleteList.map((item, i) => {
          const classNameDyn = `autocomp-item ui-menu-item ${
            cursor === i ? 'autoCompleteActive' : null
          }`
          return (
            <li
              className={classNameDyn}
              key={item.id}
              tabIndex='-1'
              onClick={() => setAutocompleteItem(item)}
            >
              <div className='filter-autocomp-result-div'>
                {item.category === 'LOCATION' ? (
                  <PlaceIcon className='filter-auto-comp-icon' />
                ) : item.category === 'ACCESSIBILITY' ? (
                  <BusIcon className='filter-auto-comp-icon' />
                ) : (
                  <HomeIcon className='filter-auto-comp-icon' />
                )}
                {item.label}
                <span className='autocomplete-category'>{item.category}</span>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
  return null
}

export default FilterAutoCompleteList
