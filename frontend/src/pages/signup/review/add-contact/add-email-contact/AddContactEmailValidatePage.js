import { useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../../../common-layouts/email/ValidateEmailLayout'

export default function ValidateEmailContactPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => navigate('/signup/review')
  const SkipValidation = () => {
    navigate('/signup/review')
  }
  const DifferentEmail = () => {
    navigate('/signup/review/add-email')
  }

  return (
    <ValidateEmailLayout
      NavigateToNextPage={NavigateToNextPage}
      SkipValidation={SkipValidation}
      DifferentEmail={DifferentEmail}
      NavigateToPreviousPage={DifferentEmail}
      buttonText='Continue'
    />
  )
}