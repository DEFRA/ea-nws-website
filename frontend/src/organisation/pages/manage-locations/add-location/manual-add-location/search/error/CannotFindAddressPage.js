import { React } from 'react'
import { useNavigate } from 'react-router'
import CannotFindAddressLayout from '../../../../../../layouts/location/add-or-edit-location/error/CannotFindAddressLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function CannotFindAddressPage () {
  const navigate = useNavigate()

  const navigateToDifferentPostCode = () =>
    navigate(orgManageLocationsUrls.add.search.postCodeSearch)

  const navigateToFindLocationOnMap = () =>
    navigate(orgManageLocationsUrls.add.search.dropPinSearch)

  return (
    <>
      <CannotFindAddressLayout
        navigateToDifferentPostCode={navigateToDifferentPostCode}
        navigateToFindLocationOnMap={navigateToFindLocationOnMap}
      />
    </>
  )
}
