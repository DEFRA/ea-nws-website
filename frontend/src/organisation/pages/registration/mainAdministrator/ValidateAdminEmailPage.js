import { useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../layouts/email/ValidateEmailLayout'

export default function ValidateAdminEmailPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = (adminDetails) => {
    navigate('/organisation/register/alternative-contact', {
      state: {
        isAdmin: adminDetails
      }
    })
  }

  const NavigateToPreviousPage = () => {
    navigate('/organisation/register/main-admin')
  }

  return (
    <ValidateEmailLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      buttonText='Continue'
    />
  )
}
