import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddAccountNameLayout from '../../common-layouts/account-name/AddAccountNameLayout'
import { setProfile } from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'

export default function ChangeNamePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const NavigateToPreviousPage = () => {
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
      dispatch(
        setProfile(data.profile)
      )
      navigate('/account', {
        state: {
          changeName: true,
          name: profile?.firstname+' '+profile?.lastname
        }
      })
    }
  }

  return (
    <AddAccountNameLayout
      NavigateToPreviousPage={NavigateToPreviousPage}
      buttonText='Save changes'
      changeName={true}
      updateProfile={updateProfile}
    />
  )
}