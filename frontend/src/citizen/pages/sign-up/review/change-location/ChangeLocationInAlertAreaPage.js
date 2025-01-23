import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProfile } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { removeLocation } from '../../../../../common/services/ProfileServices'
import LocationInAlertAreaLayout from '../../../../layouts/location/LocationInAlertAreaLayout'

export default function ChangeLocationInAlertAreaPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const locationBeingChanged = useSelector(
    (state) => state.session.locationToBeChanged
  )

  const continueToNextPage = async (profile) => {
    let updatedProfile = profile

    updatedProfile = await removeLocation(
      updatedProfile,
      locationBeingChanged.address
    )

    // unregister the selected location to be changed from partner
    const data = {
      authToken,
      locationId: locationBeingChanged.id,
      partnerId: '1' // this is currently a hardcoded value - geosafe to update us
    }

    await backendCall(
      data,
      'api/partner/unregister_location_from_partner',
      navigate
    )

    dispatch(setProfile(updatedProfile))
    navigate('/signup/review')
  }

  return (
    <>
      <LocationInAlertAreaLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
