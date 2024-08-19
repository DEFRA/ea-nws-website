import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import ValidateEmailLayout from '../../layouts/email/ValidateEmailLayout'

export default function ChangeEmailValidationPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const DifferentEmail = () => {
    navigate('/account/change-email')
  }

  const updateProfile = async (profile, authToken) => {
    // The sign in email is always the first one in the array
    // Pop out the last email added and put it in first position
    const profileEmails = profile.emails
    profileEmails[0] = profileEmails.pop()
    profile.emails = profileEmails

    const dataToSend = { profile, authToken }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/profile/update',
      navigate
    )

    if (errorMessage !== null) {
      setError(errorMessage)
    } else {
      dispatch(setProfile(profile))
      navigate('/account', {
        state: {
          changeEmail: true,
          email: profile.emails[0]
        }
      })
    }
  }

  return (
    <ValidateEmailLayout
      DifferentEmail={DifferentEmail}
      NavigateToPreviousPage={DifferentEmail}
      buttonText='Confirm email address'
      changeSignIn
      profileError={error}
      updateProfile={updateProfile}
    />
  )
}
