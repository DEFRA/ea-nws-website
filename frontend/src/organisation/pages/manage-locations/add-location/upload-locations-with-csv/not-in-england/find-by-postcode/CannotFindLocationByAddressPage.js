import { React } from 'react'
import { useNavigate } from 'react-router'
import CannotFindAddressLayout from '../../../../../../layouts/location/add-or-edit-location/error/CannotFindAddressLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function CannotFindLocationByAddressPage () {
  const navigate = useNavigate()

  const navigateToNextPage = (event) =>
    event.preventDefault()
  navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.find)

  const navigateToDifferentPostCode = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.postcode)

  const navigateToDifferentCoordinates = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.coordinates)

  const navigateToFindLocationOnMap = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.map)
  }

  return (
    <>
      <CannotFindAddressLayout
        navigateToNextPage={navigateToNextPage}
        navigateToDifferentPostCode={navigateToDifferentPostCode}
        navigateToDifferentCoordinates={navigateToDifferentCoordinates}
        navigateToFindLocationOnMap={navigateToFindLocationOnMap}
        flow='unmatched-locations-not-in-england'
      />
    </>
  )
}
