import { React } from 'react'
import { useNavigate } from 'react-router'
import CannotFindAddressLayout from '../../../../../../../layouts/location/add-or-edit-location/error/CannotFindAddressLayout'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function CannotFindLocationByPostCodeAddressPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.find)

  const navigateToDifferentPostCode = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.postcode)

  const navigateToDifferentCoordinates = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.coordinates)

  const navigateToFindLocationOnMap = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.map)
  }

  return (
    <>
      <CannotFindAddressLayout
        navigateToNextPage={navigateToNextPage}
        navigateToDifferentPostCode={navigateToDifferentPostCode}
        navigateToDifferentCoordinates={navigateToDifferentCoordinates}
        navigateToFindLocationOnMap={navigateToFindLocationOnMap}
        flow='unmatched-locations-not-found'
      />
    </>
  )
}
