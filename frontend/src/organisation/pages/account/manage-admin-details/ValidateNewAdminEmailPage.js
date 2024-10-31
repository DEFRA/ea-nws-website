import { useNavigate } from 'react-router'
import ValidateEmailLayout from '../../../../common/layouts/email/ValidateEmailLayout'
import { accountUrls } from '../../../routes/account/AccountRoutes'
export default function ValidateNewAdminEmailPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate(accountUrls.admin.details)
  }

  const NavigateToPreviousPage = () => {
    navigate(accountUrls.admin.changeDetails)
  }

  return (
    <ValidateEmailLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      buttonText='Continue'
    />
  )
}
