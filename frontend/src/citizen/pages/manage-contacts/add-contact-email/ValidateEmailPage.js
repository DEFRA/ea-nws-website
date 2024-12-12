import { useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../../common/layouts/email/ValidateEmailLayout'

export default function ValidateEmailPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
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
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={DifferentEmail}
      SkipValidation={SkipValidation}
      DifferentEmail={DifferentEmail}
      buttonText='Continue'
    />
  )
}
