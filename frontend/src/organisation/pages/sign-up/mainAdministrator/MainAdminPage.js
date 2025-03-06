import { useNavigate } from 'react-router'
import MainAdminLayout from '../../../layouts/admin/MainAdminLayout'
import { orgSignUpUrls } from '../../../routes/sign-up/SignUpRoutes'

export default function MainAdminPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgSignUpUrls.admin.details)
  }

  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.sector)
  }

  return (
    <MainAdminLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
