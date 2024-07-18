import { useNavigate } from 'react-router-dom'
import ValidateLandlineLayout from '../../../../../common-layouts/landline/ValidateLandlineLayout'
export default function ValidateLandlineContactPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/signup/review')
  }
  const SkipValidation = () => {
    navigate('/signup/review')
  }
  const DifferentHomePhone = () => {
    navigate('/signup/review/add-landline')
  }

  return (
    <ValidateLandlineLayout 
    NavigateToNextPage={NavigateToNextPage} 
    NavigateToPreviousPage={DifferentHomePhone}
    SkipValidation={SkipValidation} 
    DifferentHomePhone={DifferentHomePhone} />
  )
}
