import { useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../../../common-layouts/email/ValidateEmailLayout'

export default function ValidateEmailContactPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => navigate('/signup/review')
  const SkipValidation = () => {
    navigate('/signup/review')
  }
  const DifferentMobile = () => {
    navigate('/signup/review/add-email')
  }

  return (
    <ValidateEmailLayout
      NavigateToNextPage={NavigateToNextPage}
      SkipValidation={SkipValidation}
      DifferentMobile={DifferentMobile}
      buttonText='Continue'
    />
  )
}