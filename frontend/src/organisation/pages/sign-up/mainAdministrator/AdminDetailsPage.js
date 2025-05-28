import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet'
import AdminDetailsLayout from '../../../layouts/admin/AdminDetailsLayout'
import { orgSignUpUrls } from '../../../routes/sign-up/SignUpRoutes'

export default function AdminDetailsPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgSignUpUrls.admin.confirmEmail)
  }
  const NavigateToPreviousPage = () => {
    navigate(orgSignUpUrls.admin.mainAdmin)
  }

  return (
    <>
      <Helmet>
        <title>Admin details - GOV.UK</title>
      </Helmet>
      <AdminDetailsLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
