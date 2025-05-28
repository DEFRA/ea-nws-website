import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { updateAdditionals } from '../../../common/services/ProfileServices'
import ConfirmAddressLayout from '../../layouts/address/ConfirmAddressLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function ConfirmAddressPage () {
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
        { id: 'signupComplete', value: { s: 'false' } },
        { id: 'lastAccessedUrl', value: { s: orgSignUpUrls.compHouseNum } }
      ])
      dispatch(setProfile(updatedProfile))

      const profileDataToSend = {
        profile: updatedProfile,
        authToken,
        signinType: 'org'
      }
      await backendCall(profileDataToSend, 'api/profile/update', navigate)

      navigate(orgSignUpUrls.compHouseNum)
    }
  }

  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.address.select)
  }

  return (
    <>
      <Helmet>
        <title>Confirm Address - GOV.UK</title>
      </Helmet>
      <ConfirmAddressLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
