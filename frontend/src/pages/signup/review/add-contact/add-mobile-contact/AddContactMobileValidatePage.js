import { useNavigate } from 'react-router-dom'
import ValidateMobileLayout from '../../../../../common-layouts/mobile/ValidateMobileLayout'
export default function ValidateMobileContactPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => navigate('/signup/review')
  const SkipValidation = () => {
    navigate('/signup/review')
  }
  const DifferentMobile = () => {
    navigate('/signup/review/add-mobile')
  }

  return (
    <ValidateMobileLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={DifferentMobile}
      SkipValidation={SkipValidation}
      DifferentMobile={DifferentMobile}
    />
  )
}