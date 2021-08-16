import React, { useRef, useState } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

const MyMapComponent = props => {
  const [center, setCenter] = useState({
    lat: props.centerCoords.lat,
    lng: props.centerCoords.lng
  })
  const refMap = useRef(null)

  const handleBoundsChanged = () => {
    const mapCenter = refMap.current.getCenter() // get map center
    props.sendCenter({ lat: mapCenter.lat(), lng: mapCenter.lng() })

    setCenter({ lat: mapCenter.lat(), lng: mapCenter.lng() })
  }
  return (
    <GoogleMap
      ref={refMap}
      defaultZoom={18}
      defaultCenter={center}
      onBoundsChanged={handleBoundsChanged}
    >
      <Marker icon={'/img/home-address.png'} position={center} />
    </GoogleMap>
  )
}

export default withScriptjs(withGoogleMap(MyMapComponent))
