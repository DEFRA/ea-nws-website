import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProfile } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import AddAccountNameLayout from '../../../../layouts/account-name/AddAccountNameLayout'

export default function ChangeAccountNamePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const NavigateToPreviousPage = () => {
    navigate('/signup/review')
  }

  const navigateToNextPage = () => {
    navigate('/signup/review')
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
      navigate('/signup/review', {
        state: {
          changeName: true,
          name: profile?.firstname + ' ' + profile?.lastname
        }
      })
    }
  }

  return (
    <>
      <Helmet>
        <title>Enter your name - Get flood warnings - GOV.UK</title>
      </Helmet>
      <AddAccountNameLayout
        NavigateToPreviousPage={NavigateToPreviousPage}
        navigateToNextPage={navigateToNextPage}
        buttonText='Save changes'
        changeName
        updateProfile={updateProfile}
        profileError={error}
      />
    </>
  )
}
