import React from 'react'
import LocationXYCoordinatesSearchLayout from '../../../../../../layouts/location/LocationXYCoordinatesSearchLayout'

export default function LocationXYCoordinatesSearchPage () {
  return (
    <>
      <LocationXYCoordinatesSearchLayout
        allAlertsRoute='/organisation/manage-locations/add/location-in-area/xy-coordinates-search/all'
        alertsRoute='/organisation/manage-locations/add/location-in-area/xy-coordinates-search/alerts'
        noAlertsRoute='/organisation/manage-locations/add/location-in-area/xy-coordinates-search/no-alerts'
      />
    </>
  )
}
