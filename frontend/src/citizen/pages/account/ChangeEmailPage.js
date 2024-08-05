import { useNavigate } from 'react-router-dom'
import ChangeEmailLayout from '../../layouts/email/ChangeEmailLayout'

export default function ChangeEmailPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/account/change-email/validate')
  }

  const NavigateToPreviousPage = () => {
    navigate('/account')
  }

  return (
    <ChangeEmailLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
