import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import ValidateLandlineLayout from '../../../../layouts/landline/ValidateLandlineLayout'

export default function ValidateLandlinePhonePage () {
  const navigate = useNavigate()

  const navigateToNextPage = (homePhone) => {
    navigate('/signup/accountname/add', {
      state: {
        banner: { heading: 'Telephone number confirmed', text: homePhone }
      }
    })
  }

  const SkipValidation = () => {
    navigate('/signup/contactpreferences/landline/skipconfirmation')
  }

  const DifferentHomePhone = () => {
    navigate('/signup/contactpreferences/landline/add')
  }

  return (
    <>
      <Helmet>
        <title>Confirm Telephone Number - Next Warning Service GOV.UK</title>
      </Helmet>
      <ValidateLandlineLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={DifferentHomePhone}
        SkipValidation={SkipValidation}
        DifferentHomePhone={DifferentHomePhone}
        isSignUpJourney
      />
    </>
  )
}
