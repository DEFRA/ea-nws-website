import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ValidateLandlineLayout from '../../../../common-layouts/landline/ValidateLandlineLayout'
import SkipConfirmLayout from '../../../../common-layouts/skip-confirm/SkipConfirmLayout'

export default function ValidateLandlinePhonePage() {
  const navigate = useNavigate()
  const session = useSelector((state) => state.session)

  const NavigateToNextPage = () => {
    if (session.contactPreferences.includes('Email')) {
      // navigate to email TODO - cameron add this once merged
    } else if (session.contactPreferences.includes('Mobile')) {
      navigate('/signup/contactpreferences/mobile/add')
    } else {
      navigate('/signup/accountname/add')
    }
  }

  const SkipValidation = (homePhone) => {
    <SkipConfirmLayout
      contactPreference={homePhone}
    />
  }
  const DifferentHomePhone = (homePhone) => {
    navigate('/signup/contactpreferences/landline/add', {
      state: {
        homePhone
      }
    })
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
