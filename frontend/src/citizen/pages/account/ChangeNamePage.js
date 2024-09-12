import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import AddAccountNameLayout from '../../layouts/account-name/AddAccountNameLayout'

export default function ChangeNamePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const NavigateToPreviousPage = () => {
    navigate('/account')
  }

  const NavigateToNextPage = () => {
    navigate('/account')
  }

  const updateProfile = async (profile, authToken) => {
    const dataToSend = { profile, authToken }
    const { errorMessage, data } = await backendCall(
      dataToSend,
      'api/profile/update',
      navigate
    )
    if (errorMessage !== null) {
      setError(errorMessage)
    } else {
      dispatch(setProfile(data.profile))
      navigate('/account', {
        state: {
          changeName: true,
          name: profile?.firstname + ' ' + profile?.lastname
        }
      })
    }
  }

  return (
    <AddAccountNameLayout
      NavigateToPreviousPage={NavigateToPreviousPage}
      NavigateToNextPage={NavigateToNextPage}
      buttonText='Save changes'
      changeName
      updateProfile={updateProfile}
      profileError={error}
    />
  )
}
