const MEAN_RADIUS_EARTH_IN_KM = 6371
const DEG_TO_RAD_DIVISOR = 57.2957795
const ZOOM_FACTOR = 1.6446

const toRadians = degrees => degrees / DEG_TO_RAD_DIVISOR

const haversine = (maxLat, minLat, maxLng, minLng) => {
  const dLat = maxLat - minLat
  const dLng = maxLng - minLng
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(minLat) *
      Math.cos(maxLat) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return MEAN_RADIUS_EARTH_IN_KM * c
}

export const optimalZoomLevel = (maxLat, minLat, maxLng, minLng) => {
  const minMapDimension = Math.min.apply(this, [
    (window.innerWidth * 2) / 3,
    550
  ])
  ;[maxLat, minLat, maxLng, minLng] = [maxLat, minLat, maxLng, minLng].map(l =>
    toRadians(l)
  )
  const greatCircleDistance = haversine(maxLat, minLat, maxLng, minLng)
  return Math.floor(
    8 -
      Math.log(
        (ZOOM_FACTOR * greatCircleDistance) /
          Math.sqrt(2 * (minMapDimension * minMapDimension))
      ) /
        Math.log(2)
  )
}
