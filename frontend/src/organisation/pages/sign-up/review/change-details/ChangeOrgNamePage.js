import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import AddNameLayout from '../../../../layouts/name/AddNameLayout'
import { orgSignUpUrls } from '../../../../routes/sign-up/SignUpRoutes'

export default function ChangeOrgNamePage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => navigate(orgSignUpUrls.review)

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>Change Organisation Name - GOV.UK</title>
      </Helmet>
      <AddNameLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
