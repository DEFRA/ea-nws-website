import React from 'react'
import { Helmet } from 'react-helmet'
import LocationCannotGetFloodMessagesLayout from '../../../layouts/location/LocationCannotGetFloodMessagesLayout'

export default function LocationCannotGetFloodMessagesPage() {
  const nearbyFloodAreasPage = '/manage-locations/add/location-near-flood-areas'
  const searchResultsPage = '/manage-locations/add/search-results'

  return (
    <>
      <Helmet>
        <title>Select an address - Get flood warnings - GOV.UK</title>
      </Helmet>
      <LocationCannotGetFloodMessagesLayout
        navigateToNearbyFloodAreas={nearbyFloodAreasPage}
        navigateToSearchResultsPage={searchResultsPage}
      />
    </>
  )
}
