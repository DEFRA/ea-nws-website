import { useNavigate } from 'react-router-dom'
import ValidateLandlineLayout from '../../../common-layouts/landline/ValidateLandlineLayout'
export default function ValidateLandlinePhonePage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => navigate('/managecontacts')
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
    <ValidateLandlineLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={DifferentHomephone}
      SkipValidation={SkipValidation}
      DifferentHomePhone={DifferentHomephone}
      ContinueToAlreadyEnteredMobileOptions={DifferentHomephone}
    />
  )
}
