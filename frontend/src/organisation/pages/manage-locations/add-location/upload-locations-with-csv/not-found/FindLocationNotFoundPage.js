import { React } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import FindUnmatchedLocationLayout from '../../../../../layouts/location/upload-locations-with-csv/unmatched-locations/FindUnmatchedLocationLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationNotFoundPage () {
  const navigate = useNavigate()

  const navigateToFindPostCode = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.postcode)

  const navigateToFindAddress = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.address)

  const navigateToFindCoordinates = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.coordinates)
  }

  const navigateToFindLocationOnMap = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.map)
  }

  return (
    <>
      <Helmet>
        <title>Find location not found - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <FindUnmatchedLocationLayout
        navigateToFindPostCode={navigateToFindPostCode}
        navigateToFindAddress={navigateToFindAddress}
        navigateToFindCoordinates={navigateToFindCoordinates}
        navigateToFindLocationOnMap={navigateToFindLocationOnMap}
        flow='unmatched-locations-not-found'
      />
    </>
  )
}
