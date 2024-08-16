const convertWebProfile = (webProfile) => {
  // remove additionals since they do not yet work with geoSafe
  webProfile.additionals = []
  // format pois for geoSafe
  webProfile.pois.forEach((location) => {
    // convert lat/long to degrees in 10^-6
    location.coordinates.latitude = parseInt(location.coordinates.latitude * 10 ** 6)
    location.coordinates.longitude = parseInt(location.coordinates.longitude * 10 ** 6)
    // remove categoies for pois as geoSafe does not support this yet
    delete location.categories
  })
  return webProfile
}

const convertGeoSafeProfile = (geoSafeProfile, webProfile) => {
  // add additionals if they are in the web profile
  if ((!geoSafeProfile.additionals.length > 0 || !geoSafeProfile.additionals) && webProfile) {
    geoSafeProfile.additionals = webProfile.additionals
  }
  // format pois for web profile
  geoSafeProfile.pois.forEach((location) => {
    // convert lat/long to degrees
    location.coordinates.latitude = location.coordinates.latitude / 10 ** 6
    location.coordinates.longitude = location.coordinates.longitude / 10 ** 6
  })
  return geoSafeProfile
}

module.exports = { convertWebProfile, convertGeoSafeProfile }
