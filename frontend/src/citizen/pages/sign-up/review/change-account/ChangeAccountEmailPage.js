import { useNavigate } from 'react-router-dom'
import ChangeEmailLayout from '../../../../layouts/email/ChangeEmailLayout'

export default function ChangeAccountEmailPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/signup/review/change-email-validate')
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/review')
  }

  return (
    <ChangeEmailLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
