import { useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../layouts/email/ValidateEmailLayout'

export default function ValidateEmailPage () {
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
      NavigateToPreviousPage={DifferentEmail}
      SkipValidation={SkipValidation}
      DifferentEmail={DifferentEmail}
      buttonText='Continue'
    />
  )
}
