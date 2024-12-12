import { useNavigate } from 'react-router-dom'
import ChangeEmailLayout from '../../../../layouts/email/ChangeEmailLayout'

export default function ChangeAccountEmailPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate('/signup/review/change-email-validate')
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/review')
  }

  return (
    <ChangeEmailLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
