import React from 'react'
import { compose, withStateHandlers } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

const HomeOwnerShipDetailsMap = compose(
  withStateHandlers(
    () => ({
      isOpen: false,
      data: {}
    }),
    {
      onToggleOpen: () => data => {
        return {
          isOpen: true,
          data
        }
      },
      onToggleClose: ({ isOpen }) => () => {
        return {
          isOpen: !isOpen
        }
      }
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{
        lat: Number(props.centerCoords.lat),
        lng: Number(props.centerCoords.lng)
      }}
    >
      {props.markers.map(item => {
        return (
          <Marker
            key={item.id}
            defaultIcon={'/img/logo.png'}
            position={{ lat: item.latitude, lng: item.longitude }}
          />
        )
      })}
    </GoogleMap>
  )
})

export default HomeOwnerShipDetailsMap
