import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ValidateLandlineLayout from '../../../../common-layouts/landline/ValidateLandlineLayout'
export default function ValidateLandlinePhonePage () {
  const navigate = useNavigate()
  //const session = useSelector((state) => state.session)

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

  const ChooseLandLine = () => {
    navigate('/signup/contactpreferences/landline/choosenumber')
  }
  return (
    <ValidateLandlineLayout
      NavigateToNextPage={NavigateToNextPage}
      SkipValidation={SkipValidation}
      DifferentHomePhone={DifferentHomePhone}
      ChooseLandLine={ChooseLandLine}
    />
  )
}
