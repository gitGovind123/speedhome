import React from 'react'
import Select from 'react-select'

const SelectBox = ({
  data,
  stateVal,
  changeVal,
  className = 'default',
  placeholderText,
  required = false
}) => {
  let buildValueObj = {
    value: stateVal && stateVal.value ? stateVal.value : '',
    label: stateVal && stateVal.label ? stateVal.label : ''
  }

  return (
    <Select
      name='country'
      className={className}
      options={data.map(options => ({
        value: options.value,
        label: options.label
      }))}
      value={buildValueObj}
      defaultValue={buildValueObj}
      placeholder={placeholderText || ''}
      styles={selectStyles}
      onChange={changeVal}
      required={required}
      isSearchable={false}
    />
  )
}

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '2px solid rgb(114, 114, 114)',
    boxShadow: 'none',
    borderRadius: '0',
    opacity: '1',
    minHeight: '48px',
    width: '100%',
    fontSize: '17px',
    transition: 'all .4s ease-in-out',
    transform: 'translateY(0)',
    '&:hover': {
      borderColor: 'rgb(114, 114, 114)'
    }
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: 'rgb(114, 114, 114)',
    padding: '0 8px',
    transition: 'all .4s ease',
    transform: state.selectProps.menuIsOpen
      ? 'rotate(-180deg)'
      : 'rotate(0deg)',

    svg: {
      width: '35px',
      height: '35px'
    }
  }),

  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: 'none'
  }),

  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? 'rgb(249, 249, 249)' : 'rgb(255, 255, 255)',
    // height: '50px',
    width: '95%',
    paddingTop: '13px',
    fontWeight: '700',
    fontSize: '18px',
    color: 'rgb(114, 114, 114)',
    borderBottom: '1px solid rgb(181, 181, 181)',
    '&:last-child': {
      borderBottom: 'none'
    },

    '&:hover': {
      background: 'rgb(249, 249, 249)',
      color: 'rgb(114, 114, 114)'
    }
  }),

  menuList: (provided, state) => ({
    ...provided,
    padding: '0',
    borderRadius: '4px'
  })
}

export default SelectBox
