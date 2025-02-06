import { useNavigate } from 'react-router-dom'
import ValidateLandlineLayout from '../../../../layouts/landline/ValidateLandlineLayout'

export default function ValidateLandlinePhonePage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate('/signup/accountname/add', {state: 'landline'})
  }

  const SkipValidation = () => {
    navigate('/signup/contactpreferences/landline/skipconfirmation')
  }

  const DifferentHomePhone = () => {
    navigate('/signup/contactpreferences/landline/add')
  }

  return (
    <ValidateLandlineLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={DifferentHomePhone}
      SkipValidation={SkipValidation}
      DifferentHomePhone={DifferentHomePhone}
    />
  )
}
