import { useNavigate } from 'react-router-dom'
import SignInValidatePageLayout from '../../../common/layouts/sign-in/SignInValidatePageLayout'
import { orgManageLocationsUrls } from '../../routes/manage-locations/ManageLocationsRoutes'

export default function SignInValidatePage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.monitoring.view)
  }

  const NavigateToPreviousPage = () => {
    navigate('/organisation/signin')
  }

  return (
    <SignInValidatePageLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
