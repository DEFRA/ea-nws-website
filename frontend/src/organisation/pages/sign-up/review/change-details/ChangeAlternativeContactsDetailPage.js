import { useNavigate } from 'react-router'
import AlternativeContactDetailsLayout from '../../../../layouts/alternative-contact/AlternativeContactDetailsLayout'
import { orgSignUpUrls } from '../../../../routes/sign-up/SignUpRoutes'

export default function ChangeAlternativeContactDetailsPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgSignUpUrls.review)
  }

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <AlternativeContactDetailsLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
