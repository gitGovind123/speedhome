import React, { useRef, useState } from 'react'
import { compose, withStateHandlers } from 'recompose'
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'

import PropertyListItem from './PropertyListItem'
import { withRouter } from 'next/router'
import ReduxContainerForMap from './ReduxContainerForMap'

const getCurrency = num => {
  const fmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MYR'
  })
  return fmt
    .format(num)
    .replace('MYR', 'RM')
    .replace(/\..*?$/, '')
}

const MapView = compose(
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
  const mapRef = useRef(null)
  const [isOpenSingleList, setIsOpenSignleList] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)

  const clearSelectedProperty = () => {
    setIsOpenSignleList(false)
    setSelectedProperty(null)
  }
  const centerCoordsLat = props.centerCoords.lat
    ? Number(props.centerCoords.lat)
    : Number('3.1294483')
  const centerCoordsLng = props.centerCoords.lng
    ? Number(props.centerCoords.lng)
    : Number('101.72430789999999')

  return (
    <GoogleMap
      defaultZoom={props.defaultZoom || 15}
      center={{
        lat: centerCoordsLat,
        lng: centerCoordsLng
      }}
      ref={mapRef}
      onDragStart={() => clearSelectedProperty()}
      onDragEnd={() => {
        clearSelectedProperty()
        props.changeCoords(mapRef.current.getCenter().toString())
      }}
      onZoomChanged={() => {
        clearSelectedProperty()
        props.changeCoords(mapRef.current.getCenter().toString())
      }}
    >
      {props.markers &&
        props.markers[0].content.map(item => {
          return (
            <MarkerWithLabel
              key={item.id}
              labelAnchor={new window.google.maps.Point(55, 40)}
              icon='none'
              position={{ lat: item.latitude, lng: item.longitude }}
              onClick={() => {
                clearSelectedProperty()
                setTimeout(() => {
                  setIsOpenSignleList(true)
                  setSelectedProperty(item)
                }, 10)
              }}
              labelStyle={{
                borderRadius: '1em',
                background:
                  selectedProperty && selectedProperty.id === item.id
                    ? '#90278e'
                    : '#fff',
                color:
                  selectedProperty && selectedProperty.id === item.id
                    ? '#fff'
                    : '#000',
                padding: '0.5em',
                fontSize: '1.5em',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                border:
                  selectedProperty && selectedProperty.id === item.id
                    ? '1px solid #90278e'
                    : '1px solid #39D196'
              }}
              zIndex={
                selectedProperty && selectedProperty.id === item.id ? 99999 : 0
              }
            >
              <div>{getCurrency(item.price)}</div>
            </MarkerWithLabel>
          )
        })}

      {isOpenSingleList && selectedProperty ? (
        <InfoBox
          defaultPosition={
            new google.maps.LatLng(
              Number(selectedProperty.latitude),
              Number(selectedProperty.longitude)
            )
          }
          position={
            new google.maps.LatLng(
              Number(selectedProperty.latitude),
              Number(selectedProperty.longitude)
            )
          }
          options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
          <div
            style={{
              minWidth: '230px',
              maxWidth: '250px',
              zIndex: '99999'
            }}
          >
            {/* <LayoutContainer> */}
            <ReduxContainerForMap router={props.router}>
              <PropertyListItem
                mapViewModal={true}
                data={selectedProperty}
                router={props.router}
                closePropertyOnMap={clearSelectedProperty}
              />
            </ReduxContainerForMap>

            {/* </LayoutContainer> */}
          </div>
        </InfoBox>
      ) : null}
    </GoogleMap>
  )
})

export default withRouter(MapView)
