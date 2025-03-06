import { useNavigate } from 'react-router'
import AlternativeContactDetailsLayout from '../../layouts/alternative-contact/AlternativeContactDetailsLayout'
import { orgSignUpUrls } from '../../routes/sign-up/SignUpRoutes'

export default function AlternativeContactDetailsPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgSignUpUrls.termsAndConditions)
  }

  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.admin.details)
  }

  return (
    <AlternativeContactDetailsLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
