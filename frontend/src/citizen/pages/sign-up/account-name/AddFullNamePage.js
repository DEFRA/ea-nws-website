import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import {
  getLocationOtherAdditional,
  setProfile
} from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import {
  getRegistrationParams,
  updateAdditionals
} from '../../../../common/services/ProfileServices'
import AddAccountNameLayout from '../../../layouts/account-name/AddAccountNameLayout'

export default function AddFullNamePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState()
  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId () {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  const navigateToNextPage = () => {
    navigate('/declaration')
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/contactpreferences')
  }

  const updateProfile = async (profile, authToken) => {
    const updatedProfile = updateAdditionals(profile, [
      { id: 'lastAccessedUrl', value: { s: '/declaration' } }
    ])
    const dataToSend = { profile: updatedProfile, authToken }
    const { errorMessage, data } = await backendCall(
      dataToSend,
      'api/profile/update',
      navigate
    )
    if (errorMessage !== null) {
      setError(errorMessage)
    } else {
      // update all locations since channel preferences will now be set
      await updateAllLocationsRegistrations(authToken, data.profile)
      dispatch(setProfile(data.profile))
      navigate('/declaration')
    }
  }

  const updateAllLocationsRegistrations = async (authToken, profile) => {
    profile.pois.map(async (poi) => {
      const alertTypes = getLocationOtherAdditional(
        poi.additionals,
        'alertTypes'
      )

      const data = {
        authToken,
        locationId: poi.id,
        partnerId,
        params: getRegistrationParams(profile, alertTypes)
      }

      await backendCall(
        data,
        'api/partner/update_location_registration',
        navigate
      )
    })
  }

  return (
    <>
      <Helmet>
        <title>Enter Your Name - Next Warning Service GOV.UK</title>
      </Helmet>
      <AddAccountNameLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
        buttonText='Continue'
        updateProfile={updateProfile}
        profileError={error}
      />
    </>
  )
}
