import { useNavigate } from 'react-router'
import AdminDetailsLayout from '../../../../layouts/admin/AdminDetailsLayout'
import { orgSignUpUrls } from '../../../../routes/sign-up/SignUpRoutes'

export default function ChangeAdminDetailsPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgSignUpUrls.admin.confirmEmail, {
      state: { returnToReview: true }
    })
  }
  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <AdminDetailsLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}
