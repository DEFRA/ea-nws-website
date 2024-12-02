import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { updateAdditionals } from '../../../../common/services/ProfileServices'
import AddAccountNameLayout from '../../../layouts/account-name/AddAccountNameLayout'

export default function AddFullNamePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState()

  const NavigateToNextPage = () => {
    navigate('/declaration')
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/contactpreferences')
  }

  const updateProfile = async (profile, authToken) => {
    const updatedProfile = updateAdditionals(profile, [{ id: 'lastAccessedUrl', value: { s: '/declaration' } }])
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
      navigate('/declaration')
    }
  }

  return (
    <AddAccountNameLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      buttonText='Continue'
      updateProfile={updateProfile}
      profileError={error}
    />
  )
}
