import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import MainAdminLayout from '../../../layouts/admin/MainAdminLayout'
import { orgSignUpUrls } from '../../../routes/sign-up/SignUpRoutes'

export default function MainAdminPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgSignUpUrls.admin.details)
  }

  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.signUp)
  }

  return (
    <>
      <Helmet>
        <title>Will you be the main administrator? - GOV.UK</title>
      </Helmet>
      <MainAdminLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
