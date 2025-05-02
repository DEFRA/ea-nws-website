import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { updateAdditionals } from '../../../common/services/ProfileServices'
import CompaniesHouseNumLayout from '../../layouts/companies-house-num/CompaniesHouseNumLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function CompaniesHouseNumPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)

  const navigateToNextPage = async () => {
    // Save lastAccessedUrl so users are taken to next page if logging in after abandoning at this point
    const updatedProfile = updateAdditionals(profile, [
      { id: 'signupComplete', value: { s: 'false' } },
      { id: 'lastAccessedUrl', value: { s: orgSignUpUrls.sector } }
    ])
    dispatch(setProfile(updatedProfile))

    const profileDataToSend = {
      profile: updatedProfile,
      authToken,
      signinType: 'org'
    }
    await backendCall(profileDataToSend, 'api/profile/update', navigate)

    navigate(orgSignUpUrls.sector)
  }

  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.address.confirm)
  }

  return (
    <CompaniesHouseNumLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
