import { Helmet } from 'react-helmet'
import { useLocation, useNavigate } from 'react-router-dom'
import ValidateEmailLayout from '../../../layouts/email/ValidateEmailLayout'
import { orgSignUpUrls } from '../../../routes/sign-up/SignUpRoutes'

export default function ValidateAdminEmailPage () {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateToNextPage = async () => {
    if (location.state?.returnToReview) {
      navigate(orgSignUpUrls.review)
    } else {
      navigate(orgSignUpUrls.address.add)
    }
  }

  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.admin.details)
  }

  return (
    <>
      <Helmet>
        <title>Check Your Email - Next Warning Service GOV.UK</title>
      </Helmet>
      <ValidateEmailLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
        buttonText='Continue'
      />
    </>
  )
}
