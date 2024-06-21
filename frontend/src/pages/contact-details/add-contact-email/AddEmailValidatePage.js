import { useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../common-layouts/email/ValidateEmailLayout'

export default function AddEmailValidatePage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/managecontacts')
  }
  const SkipValidation = (email) => {
    navigate('/managecontacts', {
      state: {
        unconfirmedtype: 'email',
        unconfirmedvalue: email
      }
    })
  }
  const DifferentEmail = () => {
    navigate('/managecontacts/add-email')
  }
  return (
    <ValidateEmailLayout
      NavigateToNextPage={NavigateToNextPage}
      SkipValidation={SkipValidation}
      DifferentEmail={DifferentEmail}
    />
  )
}
