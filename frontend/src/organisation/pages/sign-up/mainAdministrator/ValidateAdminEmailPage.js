import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import { updateAdditionals } from '../../../../common/services/ProfileServices'
import ValidateEmailLayout from '../../../layouts/email/ValidateEmailLayout'
import { orgSignUpUrls } from '../../../routes/sign-up/SignUpRoutes'

export default function ValidateAdminEmailPage () {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)

  const navigateToNextPage = async () => {
    if (location.state?.returnToReview) {
      navigate(orgSignUpUrls.review)
    } else {
      // Save lastAccessedUrl so users are taken to next page if logging in after abandoning at this point
      const updatedProfile = updateAdditionals(profile, [
        { id: 'signupComplete', value: { s: 'pending' } },
        { id: 'lastAccessedUrl', value: { s: orgSignUpUrls.address.add } }
      ])
      dispatch(setProfile(updatedProfile))

      const profileDataToSend = {
        profile: updatedProfile,
        authToken,
        signinType: 'org'
      }
      await backendCall(profileDataToSend, 'api/profile/update', navigate)

      navigate(orgSignUpUrls.address.add)
    }
  }

  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.admin.details)
  }

  return (
    <ValidateEmailLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      buttonText='Continue'
    />
  )
}
