import { useState, useEffect } from 'react'

export const useCheckMobileScreen = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', handleEventListener)
    return () => {
      window.removeEventListener('resize', handleEventListener)
    }
  }, [])

  const handleEventListener = () => {
    setWidth(window.innerWidth)
  }

  return width <= 1024
}
