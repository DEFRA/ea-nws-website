import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setProfile } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { updateAdditionals } from '../../../common/services/ProfileServices'
import SectorLayout from '../../layouts/sector/SectorLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function SectorPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)

  const navigateToNextPage = async () => {
    // Save lastAccessedUrl so users are taken to next page if logging in after abandoning at this point
    const updatedProfile = updateAdditionals(profile, [
      { id: 'signupComplete', value: { s: 'false' } },
      { id: 'lastAccessedUrl', value: { s: orgSignUpUrls.altContact } }
    ])
    dispatch(setProfile(updatedProfile))

    const profileDataToSend = {
      profile: updatedProfile,
      authToken,
      signinType: 'org'
    }
    await backendCall(profileDataToSend, 'api/profile/update', navigate)

    navigate(orgSignUpUrls.altContact)
  }

  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.compHouseNum)
  }

  return (
    <>
      <Helmet>
        <title>Is your organisation a category 1 or 2 responder? - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <SectorLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
