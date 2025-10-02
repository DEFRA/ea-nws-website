import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import ValidateEmailLayout from '../../../../common/layouts/email/ValidateEmailLayout'
import { setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { orgAccountUrls } from '../../../routes/account/AccountRoutes'

export default function ValidateNewAdminEmailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const DifferentEmail = () => {
    navigate(orgAccountUrls.admin.changeDetails)
  }

  const updateProfile = async (profile, authToken, signinType) => {
    // The sign in email is always the first one in the array
    // Pop out the last email added and put it in first position
    const profileEmails = profile.emails
    profileEmails[0] = profileEmails.pop()
    profile.emails = profileEmails

    const dataToSend = { profile, authToken, signinType }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/profile/update',
      navigate
    )

    if (errorMessage !== null) {
      setError(errorMessage)
    } else {
      dispatch(setProfile(profile))

      navigate(orgAccountUrls.admin.details, {
        state: {
          email: profile.emails[0],
          successMessages: location.state.successMessages
        }
      })
    }
  }

  return (
    <>
      <Helmet>
        <title>
          Check your email - Get flood warnings (professional) - GOV.UK
        </title>
      </Helmet>
      <ValidateEmailLayout
        DifferentEmail={DifferentEmail}
        NavigateToPreviousPage={DifferentEmail}
        buttonText='Continue'
        changeSignIn
        profileError={error}
        updateProfile={updateProfile}
      />
    </>
  )
}
