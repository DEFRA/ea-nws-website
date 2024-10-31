import { useNavigate } from 'react-router'
import ValidateEmailLayout from '../../../../common/layouts/email/ValidateEmailLayout'
import { accountUrls } from '../../../routes/account/AccountRoutes'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { backendCall } from '../../../../common/services/BackendService'
import { setProfile } from '../../../../common/redux/userSlice'
export default function ValidateNewAdminEmailPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const NavigateToNextPage = () => {
    navigate(accountUrls.admin.details)
  }

  const NavigateToPreviousPage = () => {
    navigate(accountUrls.admin.changeDetails)
  }

  const DifferentEmail = () => {
    navigate(accountUrls.admin.changeDetails)
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
      navigate(accountUrls.admin.details, {
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
    buttonText='Continue'
    changeSignIn
    profileError={error}
    updateProfile={updateProfile}
    />
  )
}
