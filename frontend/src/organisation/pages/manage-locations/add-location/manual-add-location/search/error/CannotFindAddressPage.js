import { React } from 'react'
import { Helmet } from 'react-helmet'
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
      <Helmet>
        <title>Cannot Find Address - Next Warning Service GOV.UK</title>
      </Helmet>
      <CannotFindAddressLayout
        navigateToDifferentPostCode={navigateToDifferentPostCode}
        navigateToFindLocationOnMap={navigateToFindLocationOnMap}
      />
    </>
  )
}
