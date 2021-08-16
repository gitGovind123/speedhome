import React, { useState, useEffect, useRef } from 'react'

const ImageLoad = props => {
  const [showImage, setShowImage] = useState('image')
  const imgEl = useRef(null)
  useEffect(() => {
    let targetImage = imgEl.current

    let io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowImage(props.img)
          io.unobserve(targetImage)
        }
      })
    })

    io.observe(targetImage)

    return () => io.unobserve(targetImage)
  }, [])

  return <img ref={imgEl} src={showImage} alt='img' />
}
export default ImageLoad
