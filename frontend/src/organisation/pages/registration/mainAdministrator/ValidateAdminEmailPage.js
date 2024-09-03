import { useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../layouts/email/ValidateEmailLayout'

export default function ValidateAdminEmailPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/organisation/register/alternative-contact')
  }

  const NavigateToPreviousPage = () => {
    navigate('/organisation/register/admin-details')
  }

  return (
    <ValidateEmailLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      buttonText='Continue'
    />
  )
}
