import { React } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ConfirmLocationLayout from '../../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmLocationNotFoundPage () {
  const navigate = useNavigate()
  const currentLocation = useSelector((state) => state.session.currentLocation)

  const navigateToNextPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.dashboard, {
      state: {
        addedLocation: currentLocation.additionals[0].value.s
      }
    })

  const navigateToPinDropFlow = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notFound.mapDropPin)

  return (
    <>
      <Helmet>
        <title>Location Not Found - Next Warning Service GOV.UK</title>
      </Helmet>
      <ConfirmLocationLayout
        navigateToNextPage={navigateToNextPage}
        navigateToPinDropFlow={navigateToPinDropFlow}
        flow='unmatched-locations-not-found'
      />
    </>
  )
}
