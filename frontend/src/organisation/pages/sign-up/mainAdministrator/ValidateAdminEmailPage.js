import { useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../layouts/email/ValidateEmailLayout'
import { orgSignUpUrls } from '../../../routes/sign-up/SignUpRoutes'

export default function ValidateAdminEmailPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgSignUpUrls.altContact)
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
