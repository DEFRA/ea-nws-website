import React from 'react'
import LocationXYCoordinatesSearchLayout from '../../../../layouts/add-location/LocationXYCoordinatesSearchLayout'

export default function EditLocationXYCoordinatesSearchPage () {
  return (
    <>
      <LocationXYCoordinatesSearchLayout
        allAlertsRoute='/organisation/manage-locations/edit/location-in-area/xy-coordinates-search/all'
        alertsRoute='/organisation/manage-locations/edit/location-in-area/xy-coordinates-search/alerts'
        noAlertsRoute='/organisation/manage-locations/edit/location-in-area/xy-coordinates-search/no-alerts'
      />
    </>
  )
}
