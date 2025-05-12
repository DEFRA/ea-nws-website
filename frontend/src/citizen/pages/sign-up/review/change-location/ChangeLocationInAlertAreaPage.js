import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProfile } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { removeLocation } from '../../../../../common/services/ProfileServices'
import LocationInAlertAreaLayout from '../../../../layouts/location/LocationInAlertAreaLayout'

export default function ChangeLocationInAlertAreaPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const locationBeingChanged = useSelector(
    (state) => state.session.locationToBeChanged
  )
  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId () {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  const continueToNextPage = async (profile) => {
    let updatedProfile = profile

    updatedProfile = await removeLocation(
      updatedProfile,
      locationBeingChanged.address
    )

    // unregister the selected location to be changed from partner
    await backendCall(
      {
        authToken,
        locationId: locationBeingChanged.id,
        partnerId
      },
      'api/partner/unregister_location_from_partner',
      navigate
    )

    // update profile with removed location
    await backendCall(
      { authToken, profile: updatedProfile },
      'api/profile/update',
      navigate
    )

    dispatch(setProfile(updatedProfile))
    navigate('/signup/review')
  }

  return (
    <>
      <Helmet>
        <title>You Can Get Flood Alerts - Next Warning Service GOV.UK</title>
      </Helmet>
      <LocationInAlertAreaLayout continueToNextPage={continueToNextPage} />
    </>
  )
}
