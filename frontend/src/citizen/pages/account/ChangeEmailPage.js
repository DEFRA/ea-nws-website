import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import ChangeEmailLayout from '../../layouts/email/ChangeEmailLayout'

export default function ChangeEmailPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate('/account/change-email/validate')
  }

  const NavigateToPreviousPage = () => {
    navigate('/account')
  }

  return (
    <>
      <Helmet>
        <title>Change your email address - GOV.UK</title>
      </Helmet>
      <ChangeEmailLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
