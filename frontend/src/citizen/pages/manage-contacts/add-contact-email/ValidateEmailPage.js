import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../../common/layouts/email/ValidateEmailLayout'

export default function ValidateEmailPage () {
  const navigate = useNavigate()

  const navigateToNextPage = (email) => {
    navigate('/managecontacts', {
      state: {
        confirmedtype: 'email',
        confirmedvalue: email
      }
    })
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
    <>
      <Helmet>
        <title>Confirm email address - Get flood warnings - GOV.UK</title>
      </Helmet>
      <ValidateEmailLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={DifferentEmail}
        SkipValidation={SkipValidation}
        DifferentEmail={DifferentEmail}
        buttonText='Continue'
      />
    </>
  )
}
