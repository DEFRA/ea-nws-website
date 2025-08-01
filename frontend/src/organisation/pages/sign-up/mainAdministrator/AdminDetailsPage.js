import { useNavigate } from 'react-router'
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
      <AdminDetailsLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}
