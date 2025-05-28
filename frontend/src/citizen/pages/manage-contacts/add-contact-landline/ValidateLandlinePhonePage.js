import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import ValidateLandlineLayout from '../../../layouts/landline/ValidateLandlineLayout'

export default function ValidateLandlinePhonePage () {
  const navigate = useNavigate()

  const navigateToNextPage = (homePhone) => {
    navigate('/managecontacts', {
      state: {
        confirmedtype: 'homePhone',
        confirmedvalue: homePhone
      }
    })
  }
  const SkipValidation = (homePhone) => {
    navigate('/managecontacts', {
      state: {
        unconfirmedtype: 'homePhone',
        unconfirmedvalue: homePhone
      }
    })
  }
  const DifferentHomephone = () => {
    navigate('/managecontacts/add-landline')
  }

  return (
    <>
      <Helmet>
        <title>Confirm telephone number - GOV.UK</title>
      </Helmet>
      <ValidateLandlineLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={DifferentHomephone}
        SkipValidation={SkipValidation}
        DifferentHomePhone={DifferentHomephone}
        ContinueToAlreadyEnteredMobileOptions={DifferentHomephone}
      />
    </>
  )
}
