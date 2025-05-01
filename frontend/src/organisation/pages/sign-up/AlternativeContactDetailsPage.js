import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { updateAdditionals } from '../../../common/services/ProfileServices'
import AlternativeContactDetailsLayout from '../../layouts/alternative-contact/AlternativeContactDetailsLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function AlternativeContactDetailsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)

  const navigateToNextPage = async () => {
    // Save lastAccessedUrl so users are taken to next page if logging in after abandoning at this point
    const updatedProfile = updateAdditionals(profile, [
      { id: 'signupComplete', value: { s: 'pending' } },
      { id: 'lastAccessedUrl', value: { s: orgSignUpUrls.termsAndConditions } }
    ])
    dispatch(setProfile(updatedProfile))

    const profileDataToSend = {
      profile: updatedProfile,
      authToken,
      signinType: 'org'
    }
    await backendCall(profileDataToSend, 'api/profile/update', navigate)

    navigate(orgSignUpUrls.termsAndConditions)
  }

  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.sector)
  }

  return (
    <AlternativeContactDetailsLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
