import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import {
  updateAdditionals
} from '../../../../common/services/ProfileServices'
import AddAccountNameLayout from '../../../layouts/account-name/AddAccountNameLayout'

export default function AddFullNamePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState()
  const [partnerId, setPartnerId] = useState(false)
  const locationRegistrations = useSelector(
    (state) => state.session.locationRegistrations || null
  )

  async function getPartnerId() {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  const navigateToNextPage = () => {
    navigate('/signup/declaration')
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/contactpreferences')
  }

  const updateProfile = async (profile, authToken) => {
    const updatedProfile = updateAdditionals(profile, [
      { id: 'lastAccessedUrl', value: { s: '/signup/declaration' } }
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
      dispatch(setProfile(data.profile))
      navigate('/signup/declaration')
    }
  }

  return (
    <>
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
