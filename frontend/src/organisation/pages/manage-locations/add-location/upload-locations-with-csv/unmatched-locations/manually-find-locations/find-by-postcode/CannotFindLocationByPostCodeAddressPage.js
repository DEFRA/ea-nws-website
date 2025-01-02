import { React } from 'react'
import { useNavigate } from 'react-router'
import CannotFindAddressLayout from '../../../../../../../layouts/location/add-or-edit-location/error/CannotFindAddressLayout'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function CannotFindLocationByPostCodeAddressPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.find.options)

  const navigateToDifferentPostCode = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.find.postcode)

  const navigateToFindLocationOnMap = () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.find.dropPin.search)
  }

  return (
    <>
      <CannotFindAddressLayout
        navigateToNextPage={navigateToNextPage}
        navigateToDifferentPostCode={navigateToDifferentPostCode}
        navigateToFindLocationOnMap={navigateToFindLocationOnMap}
        flow='unmatched-locations'
      />
    </>
  )
}
