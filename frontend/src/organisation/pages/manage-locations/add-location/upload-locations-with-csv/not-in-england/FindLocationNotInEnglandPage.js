import { React } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import FindUnmatchedLocationLayout from '../../../../../layouts/location/upload-locations-with-csv/unmatched-locations/FindUnmatchedLocationLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationNotInEnglandPage () {
  const navigate = useNavigate()

  const navigateToFindPostCode = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.postcode)

  const navigateToFindAddress = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.address)

  const navigateToFindCoordinates = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.coordinates)
  }

  const navigateToFindLocationOnMap = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.map)
  }

  return (
    <>
      <Helmet>
        <title>Find Location Not In England - Next Warning Service GOV.UK</title>
      </Helmet>
      <FindUnmatchedLocationLayout
        navigateToFindPostCode={navigateToFindPostCode}
        navigateToFindAddress={navigateToFindAddress}
        navigateToFindCoordinates={navigateToFindCoordinates}
        navigateToFindLocationOnMap={navigateToFindLocationOnMap}
        flow='unmatched-locations-not-in-england'
      />
    </>
  )
}
