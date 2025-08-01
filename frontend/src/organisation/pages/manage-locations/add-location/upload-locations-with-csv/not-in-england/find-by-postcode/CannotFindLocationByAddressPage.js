import { React } from 'react'
import { Helmet } from 'react-helmet'
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
      <Helmet>
        <title>Cannot find location by address - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
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
