import { React } from 'react'
import { useNavigate } from 'react-router'
import FindUnmatchedLocationLayout from '../../../../../../layouts/location/upload-locations-with-csv/unmatched-locations/FindUnmatchedLocationLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function FindLocationNotInEnglandPage () {
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
