import { React } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ConfirmLocationLayout from '../../../../../layouts/location/add-or-edit-location/confirm-location/ConfirmLocationLayout'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmLocationNotInEnglandPage () {
  const navigate = useNavigate()
  const currentLocation = useSelector((state) => state.session.currentLocation)

  const navigateToNextPage = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.dashboard, {
      state: {
        addedLocation: currentLocation.additionals[0].value.s
      }
    })

  const navigateToPinDropFlow = () =>
    navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.mapDropPin)

  return (
    <>
      <Helmet>
        <title>Confirm Location - Next Warning Service GOV.UK</title>
      </Helmet>
      <ConfirmLocationLayout
        navigateToNextPage={navigateToNextPage}
        navigateToPinDropFlow={navigateToPinDropFlow}
        flow='unmatched-locations-not-in-england'
      />
    </>
  )
}
