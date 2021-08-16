import dayjs from 'dayjs'
import React, { useEffect, useMemo } from 'react'
import DatePicker from 'react-datepicker'

function CustomDatePicker ({ value, onChange, ...props }) {
  const [initialDate, invalidDate] = useMemo(() => {
    const isInFuture = dayjs().isBefore(value)
    const daysDifference = dayjs(value).diff(dayjs(), 'days')

    if (isInFuture || daysDifference >= 0) return [dayjs(value).toDate(), false]
    return [null, true]
  }, [value])

  useEffect(() => {
    if (invalidDate) onChange(null)
    // dispatch(clearDate())
  }, [invalidDate])

  const handleChange = date => {
    // dispatch(setDate(date))
    onChange(date)
  }

  return (
    <DatePicker
      selected={initialDate}
      value={initialDate}
      onChange={handleChange}
      minDate={new Date()}
      {...props}
    />
  )
}

export default CustomDatePicker
