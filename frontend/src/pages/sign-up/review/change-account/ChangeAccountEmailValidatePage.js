import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../../common-layouts/email/ValidateEmailLayout'
import { setProfile } from '../../../../redux/userSlice'
import { backendCall } from '../../../../services/BackendService'

export default function ChangeAccountEmailValidationPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const DifferentEmail = () => {
    navigate('/signup/review/change-account-email')
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
      navigate('/signup/review', {
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
