import { useNavigate } from 'react-router-dom'
import ValidateLandlineLayout from '../../../../common-layouts/landline/ValidateLandlineLayout'
export default function ValidateLandlinePhonePage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/signup/accountname/add')
  }

  const SkipValidation = () => {
    navigate('/signup/contactpreferences/landline/skipconfirmation')
  }
  const DifferentHomePhone = (homePhone) => {
    navigate('/signup/contactpreferences/landline/add', {
      state: {
        homePhone
      }
    })
  }

  const ContinueToAlreadyEnteredMobileOptions = () => {
    navigate('/signup/contactpreferences/landline/already-entered-landline')
  }
  return (
    <ValidateLandlineLayout
      NavigateToNextPage={NavigateToNextPage}
      SkipValidation={SkipValidation}
      DifferentHomePhone={DifferentHomePhone}
      ContinueToAlreadyEnteredMobileOptions={ContinueToAlreadyEnteredMobileOptions}
    />
  )
}
