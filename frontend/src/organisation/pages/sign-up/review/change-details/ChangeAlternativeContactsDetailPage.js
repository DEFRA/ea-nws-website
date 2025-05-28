import { Helmet } from 'react-helmet'
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
    <>
      <Helmet>
        <title>Change Alternative Contact Details - GOV.UK</title>
      </Helmet>
      <AlternativeContactDetailsLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
