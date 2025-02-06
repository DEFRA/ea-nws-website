import { useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../layouts/email/ValidateEmailLayout'

export default function ValidateAdminEmailPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate('/organisation/sign-up/address')
  }

  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up/admin-details')
  }

  return (
    <ValidateEmailLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      buttonText='Continue'
    />
  )
}
