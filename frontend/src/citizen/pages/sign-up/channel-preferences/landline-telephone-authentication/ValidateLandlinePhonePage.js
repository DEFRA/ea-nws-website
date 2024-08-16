import { useNavigate } from 'react-router-dom'
import ValidateLandlineLayout from '../../../../layouts/landline/ValidateLandlineLayout'

export default function ValidateLandlinePhonePage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/signup/accountname/add')
  }

  const SkipValidation = () => {
    navigate('/signup/contactpreferences/landline/skipconfirmation')
  }

  const DifferentHomePhone = () => {
    navigate('/signup/contactpreferences/landline/add')
  }

  return (
    <ValidateLandlineLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={DifferentHomePhone}
      SkipValidation={SkipValidation}
      DifferentHomePhone={DifferentHomePhone}
    />
  )
}
